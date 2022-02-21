import axios from "axios";

export async function getMe(setMe) {
  await axios.get("/api/auth/me", { withCredentials: true }).then((res) => {
    if (res.data.id) {
      setMe(res.data);
    }
  });
}

export const handleLogin = () => {
  axios.get("/auth/google/url", { withCredentials: true }).then((res) => {
    window.location.href = res.data;
  });
};

export const handleLogout = (setMe) => {
  axios.delete("/api/auth/logout", { withCredentials: true }).then((res) => {
    setMe(null);
    window.location.href = res.data;
  });
};

export const getEmailIDs = () =>
  axios.get("/api/emails", { withCredentials: true });

export const getEmail = (emailID) =>
  axios.get(`/api/emails/${emailID}`, { withCredentials: true });

export const getEmails = (emailIDs) => {
  const body = new URLSearchParams();
  body.append("emailIDs", emailIDs);

  return axios.post("/api/batchfetch", body, {
    withCredentials: true,
  });
};

export const batchDeleteEmails = (emailIDs) => {
  const body = new URLSearchParams();
  body.append("emailIDs", emailIDs);

  return axios.post("/api/batchdelete", body, {
    withCredentials: true,
  });
};
