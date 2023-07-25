import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";

import axiosInstance from "../../services/axios";

import MainHeader from "../Main/MainHeader";
import SlideNavigator from "./SlideNavigator";
import SlideCanvasLayout from "./SlideCanvasLayout";
import ObjectEditor from "./ObjectEditor";
import PresentationHeader from "./PresentationHeader";
import LoadingModal from "../Shared/Modal/LoadingModal";
import useAuthRedirect from "../../hooks/useAuthRedirect";

function useGetAllSlidesQuery(userId, presentationId, callback) {
  const query = useQuery({
    queryKey: ["slides"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/users/${userId}/presentations/${presentationId}/slides`,
      );

      return response;
    },
    onSuccess: ({ data }) => {
      callback(data.slides);
    },
  });

  return query;
}

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

  return loggedInUser;
}

function Presentation() {
  const user = getUser();
  const [slides, setSlides] = useState([]);
  const { state } = useLocation();
  const { presentationId } = useParams();
  const { isLoading } = useGetAllSlidesQuery(
    user._id,
    presentationId,
    setSlides,
  );

  useAuthRedirect(user);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <Wrapper>
      <MainHeader userInfo={user}>
        <PresentationHeader />
      </MainHeader>
      <Section>
        <SlideNavigator slides={slides} />
        <SlideCanvasLayout objects={state?.objects} />
        <ObjectEditor />
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 15vh 85vh;
`;
const Section = styled.section`
  display: grid;
  grid-template-columns: 20vw 60vw 20vw;
  height: 100%;
`;

export default Presentation;
