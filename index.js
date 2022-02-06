const app = require("express")();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const {
  PORT,
  REDIRECT_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URL,
  UI_ROOT_URI,
  JWT_SECRET,
  COOKIE_NAME,
  GOOGLE_AUTH_URL,
  GOOGLE_AUTH_SCOPE,
  GOOGLE_TOKEN_URL,
  GOOGLE_USER_ACCESS_TOKEN_URL,
  GMAIL_THREADS_URL,
  GMAIL_BATCH_DELETE_URL,
} = process.env;

app.use(
  cors({
    origin: UI_ROOT_URI,
    credentials: true,
  })
);

app.use(cookieParser());

function getGoogleAuthURL() {
  const rootUrl = GOOGLE_AUTH_URL;
  const options = {
    redirect_uri: `${SERVER_ROOT_URL}${REDIRECT_URI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: GOOGLE_AUTH_SCOPE,
  };
  const url = `${rootUrl}?${querystring.stringify(options)}`;
  console.log(url);
  return url;
}

function getTokens({ code, client_id, client_secret, redirect_uri }) {
  const url = GOOGLE_TOKEN_URL;
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
      console.log(err.message);
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
    .get(`${GOOGLE_USER_ACCESS_TOKEN_URL}=${access_token}`, {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.message);
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
  const options = {
    q: "is:unread",
    maxResults: 500,
    includeSpamTrash: false,
    labelIds: ["UNREAD", "INBOX"],
  };
  const url = `${GMAIL_THREADS_URL}?${querystring.stringify(options)}`;
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
      console.log(err.message);
    });
});

// Get individual emails
app.get("/api/emails/:id", (req, res) => {
  console.log(
    `Started GET /api/emails/${req.params.id} at`,
    new Date().toLocaleString()
  );
  const emailURL = `${GMAIL_THREADS_URL}/${req.params.id}`;
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
      console.log(err.message);
    });
});

// Batch delete emails
app.post("/api/emails/batchdelete", (req, res) => {
  console.log(`Started POST /api/emails/batch at`, new Date().toLocaleString());
  const options = {
    ids: req.body.ids,
  };
  return axios
    .post(GMAIL_BATCH_DELETE_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${req.cookies.access_token}`,
      },
      body: JSON.stringify(options),
    })
    .then((response) => res.status(200).send(response.data))
    .catch((err) => {
      console.log(err.message);
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
