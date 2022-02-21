import React from "react";
import GoogleButton from "react-google-button";
import { handleLogin } from "../api/api";
import { LoginButtonContainer } from "./utils/styles";

function LoginButton() {
  return (
    <LoginButtonContainer>
      <GoogleButton style={{ position: "fixed" }} onClick={handleLogin} />
    </LoginButtonContainer>
  );
}

export default LoginButton;
