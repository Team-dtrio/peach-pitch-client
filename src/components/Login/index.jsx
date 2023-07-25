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
  font-family: ${({ theme }) => theme.font.main};
  flex-flow: column;
  align-items: center;
  padding: 150px 0;
`;
const LoginTitle = styled.h1`
  position: relative;
  color: ${({ theme }) => theme.color.app};
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
  text-transform: uppercase;
`;
const GoogleLogo = styled.img`
  vertical-align: -2px;
  margin-right: 14px;
`;

export default Login;
