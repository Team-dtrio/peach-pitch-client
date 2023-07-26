import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import styled from "styled-components";

import { firebaseAuth } from "../../services/firebase";
import axiosInstance from "../../services/axios";

import Loading from "../Shared/Modal/LoadingModal";

import peachLoginLogoUrl from "../../assets/pp-logo-login.svg";
import googleLogoUrl from "../../assets/google-logo.svg";

function useCreateUserMutation(callback) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (userToken) => {
      const { data } = await axiosInstance.post("login", null, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      return data;
    },
    onSuccess: ({ user }) => {
      queryClient.invalidateQueries("user");

      localStorage.setItem("userInfo", JSON.stringify(user));
      callback("/");
    },
  });

  return mutation;
}

function Login() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useCreateUserMutation(navigate);
  const googleProvider = new GoogleAuthProvider();
  const portal = document.getElementById("modal");

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
      <GoogleButton onClick={signInWithGoogle}>
        <GoogleIconWrapper>
          <GoogleIcon src={googleLogoUrl} alt="google logo" />
        </GoogleIconWrapper>
        <ButtonText>
          <b>Sign In With Google</b>
        </ButtonText>
      </GoogleButton>
    </Wrapper>
  );
}

const PeachLogo = styled.img`
  position: absolute;
  top: 7%;
  left: 15%;
  width: 420px;
  height: 420px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 60vh;
  font-family: ${({ theme }) => theme.font.main};
  background: ${({ theme }) => theme.background.main};
  flex-flow: column;
  align-items: center;
  padding: 150px 0;
`;
const LoginTitle = styled.h1`
  position: relative;
  color: #fff;
  font-size: 150px;
  text-transform: uppercase;
`;
const GoogleButton = styled.button`
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #4285f4;
  color: white;
  height: 60px;
  border-radius: 2px;
  border: thin solid #888;
  white-space: nowrap;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
`;
const GoogleIconWrapper = styled.div`
  background-color: #fff;
  color: #4285f4;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  margin-right: 10px;
  padding: 10px;
  align-items: center;
  display: flex;
`;
const GoogleIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const ButtonText = styled.p`
  font-size: 1.25rem;
  letter-spacing: 0.2px;
  font-weight: 500;
  margin: 10px;
`;

export default Login;
