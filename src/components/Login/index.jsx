import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";
import { firebaseAuth } from "../../services/firebase";
import appTheme from "../../styles/appTheme";

import peachLoginLogoUrl from "../../assets/pp-logo-login.svg";
import googleLogoUrl from "../../assets/google-logo.svg";

function Login() {
  const googleProvider = new GoogleAuthProvider();

  async function signInWithGoogle() {
    const { VITE_PEACHPITCH_SERVER_URI } = import.meta.env;
    const { user } = await signInWithPopup(firebaseAuth, googleProvider);
    const idToken = await user.getIdToken();
    await axios.post(`${VITE_PEACHPITCH_SERVER_URI}/login`, null, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  }

  return (
    <ThemeProvider theme={appTheme}>
      <Wrapper>
        <PeachLogo src={peachLoginLogoUrl} />
        <LoginTitle>peachpitch</LoginTitle>
        <LoginButton onClick={signInWithGoogle}>
          <GoogleLogo src={googleLogoUrl} alt="google logo" />
          sign in with google
        </LoginButton>
      </Wrapper>
    </ThemeProvider>
  );
}

const PeachLogo = styled.img`
  position: absolute;
  top: 7%;
  left: 12%;
  width: 374px;
  height: 384px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  padding: 150px 0;
`;
const LoginTitle = styled.h1`
  position: relative;
  color: ${({ theme }) => theme.color};
  font-family: ${({ theme }) => theme.font};
  font-size: 100px;
  text-transform: uppercase;
`;
const LoginButton = styled.button`
  padding: 20px 15px;
  background-color: #FFF;
  color: #A4D473;
  border: 4px solid #A4D473;
  border-radius: 15px;
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.font};
  text-transform: uppercase;
`;
const GoogleLogo = styled.img`
  vertical-align: -2px;
  margin-right: 14px;
`;

export default Login;
