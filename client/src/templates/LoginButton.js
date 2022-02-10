import React from "react";
import GoogleButton from "react-google-button";
import { handleLogin } from "../api/api";

function LoginButton({ setMe }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <GoogleButton
        style={{ position: "fixed" }}
        onClick={() => handleLogin(setMe)}
      />
    </div>
  );
}

export default LoginButton;
