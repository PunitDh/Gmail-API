const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const REDIRECT_URI = "/auth/google/";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SERVER_ROOT_URL = process.env.SERVER_ROOT_URL;
const UI_ROOT_URI = process.env.UI_ROOT_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME;

app.use(
  cors({
    origin: UI_ROOT_URI,
    credentials: true,
  })
);

app.use(cookieParser());

function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${SERVER_ROOT_URL}${REDIRECT_URI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://mail.google.com/",
    ].join(" "),
  };
  const url = `${rootUrl}?${querystring.stringify(options)}`;
  console.log(url);
  return url;
}

function getTokens({ code, client_id, client_secret, redirect_uri }) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: "authorization_code",
  };
  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.message);
    });
}

// Getting Login URL
app.get("/auth/google/url", (req, res) => {
  console.log("Started GET /auth/google/url at", new Date().toLocaleString());
  return res.send(getGoogleAuthURL());
});

// Getting the user from Google with the code
app.get(REDIRECT_URI, async (req, res) => {
  console.log("Started GET /auth/google/ at", new Date().toLocaleString());
  const code = req.query.code;
  const { id_token, access_token } = await getTokens({
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: `${SERVER_ROOT_URL}${REDIRECT_URI}`,
  });
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.message);
    });

  console.log({ id_token, access_token, googleUser });
  const token = jwt.sign(googleUser, JWT_SECRET);
  res.cookie(COOKIE_NAME, token, {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
  });
  res
    .cookie("access_token", access_token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    })
    .redirect(UI_ROOT_URI);
});

// Getting the current user
app.get("/api/auth/me", (req, res) => {
  console.log("Started GET /api/auth/me at", new Date().toLocaleString());
  try {
    const decoded = jwt.verify(req.cookies[COOKIE_NAME], JWT_SECRET);
    return res.send(decoded);
  } catch (err) {
    res.send(err);
  }
});

// Get the current user's unread emails
app.get("/api/emails", (req, res) => {
  console.log("Started GET /api/emails at", new Date().toLocaleString());

  const emailsURL = "https://gmail.googleapis.com/gmail/v1/users/me/threads";
  const options = {
    q: "is:unread",
    maxResults: 500,
    includeSpamTrash: false,
    labelIds: ["UNREAD", "INBOX"],
  };
  const url = `${emailsURL}?${querystring.stringify(options)}`;
  console.log(url);

  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${req.cookies.access_token}`,
      },
    })
    .then((response) => {
      const emailIDs = response.data.threads.map((thread) => thread.id);
      res.status(200).send(emailIDs);
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

// Get individual emails
app.get("/api/emails/:id", (req, res) => {
  console.log(
    `Started GET /api/emails/${req.params.id} at`,
    new Date().toLocaleString()
  );
  const emailURL = `https://gmail.googleapis.com/gmail/v1/users/me/threads/${req.params.id}`;
  const options = {
    format: "metadata",
    metadataHeaders: ["From", "Subject", "Date"],
  };
  const url = `${emailURL}?${querystring.stringify(options)}`;
  console.log(url);

  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${req.cookies.access_token}`,
      },
    })
    .then((response) => res.status(200).send(response.data))
    .catch((err) => {
      throw new Error(err.message);
    });
});

// Batch delete emails
app.post("/api/emails/batchdelete", (req, res) => {
  console.log(`Started POST /api/emails/batch at`, new Date().toLocaleString());
  const batchURL =
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/batchDelete";
  const options = {
    ids: req.body.ids,
  };
  return axios
    .post(batchURL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${req.cookies.access_token}`,
      },
      body: JSON.stringify(options),
    })
    .then((response) => res.status(200).send(response.data))
    .catch((err) => {
      throw new Error(err.message);
    });
});

// Logout
app.delete("/api/auth/logout", (req, res) => {
  console.log(
    "Started DELETE /api/auth/logout at",
    new Date().toLocaleString()
  );
  try {
    res.clearCookie("access_token");
    return res.clearCookie(COOKIE_NAME).send(UI_ROOT_URI);
  } catch (err) {
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
