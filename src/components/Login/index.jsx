import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import styled from "styled-components";
import { firebaseAuth } from "../../services/firebase";

import Loading from "../Shared/Modal/LoadingModal";

import peachLoginLogoUrl from "../../assets/pp-logo-login.svg";
import googleLogoUrl from "../../assets/google-logo.svg";
import useCreateUserMutation from "../../hooks/mutations/useCreateUserMutation";

function Login() {
  const { mutate, data, isLoading } = useCreateUserMutation();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const portal = document.getElementById("modal");

  useEffect(() => {
    if (data) {
      navigate("/", { state: data.user });
    }
  }, [data]);

  async function signInWithGoogle() {
    const { user } = await signInWithPopup(firebaseAuth, googleProvider);
    const idToken = await user.getIdToken();

    mutate(idToken);
  }

  if (isLoading) {
    return createPortal(<Loading />, portal);
  }

  return (
    <Wrapper>
      <PeachLogo src={peachLoginLogoUrl} />
      <LoginTitle>peachpitch</LoginTitle>
      <LoginButton onClick={signInWithGoogle}>
        <GoogleLogo src={googleLogoUrl} alt="google logo" />
        sign in with google
      </LoginButton>
    </Wrapper>
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
  background-color: #fff;
  color: #a4d473;
  border: 4px solid #a4d473;
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
