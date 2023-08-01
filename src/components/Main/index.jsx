import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import axiosInstance from "../../services/axios";

import MainHeader from "./MainHeader";
import CreatePresentation from "./CreatePresentation";
import MyPresentation from "./MyPresentation";
import LoadingModal from "../Shared/Modal/LoadingModal";
import useAuthRedirect from "../../hooks/useAuthRedirect";

function useGetPresentationsQuery(userId, callback) {
  const query = useQuery({
    queryKey: ["presentations"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/users/${userId}/presentations`,
      );

      return response;
    },
    onSuccess: ({ data }) => {
      callback(data.presentations);
    },
    enabled: !!userId,
  });

  return query;
}

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

  return loggedInUser;
}

function Main() {
  const user = getUser();
  const [presentations, setPresentations] = useState([]);
  const { isLoading } = useGetPresentationsQuery(user?._id, setPresentations);

  useAuthRedirect(user);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <>
      <MainHeader userInfo={user} />
      <StyledMain>
        <CreatePresentation userInfo={user} />
        <MyPresentation presentations={presentations} />
      </StyledMain>
    </>
  );
}

const StyledMain = styled.main`
  padding: 0 10px;
`;

export default Main;
