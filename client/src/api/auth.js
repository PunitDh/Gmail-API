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
    console.log(res.data);
    console.log("This is getting called");
    setMe(null);
    window.location.href = res.data;
  });
};

export const getEmailIDs = () => {
  return axios.get("/api/emails", { withCredentials: true });
};

export const getEmail = (emailID) => {
  return axios.get(`/api/emails/${emailID}`, { withCredentials: true });
};
