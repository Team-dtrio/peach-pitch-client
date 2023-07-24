import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";

import MainHeader from "../Main/MainHeader";
import SlideNavigator from "./SlideNavigator";
import SlideCanvasLayout from "./SlideCanvasLayout";
import ObjectEditor from "./ObjectEditor";
import PresentationHeader from "./PresentationHeader";
import LoadingModal from "../Shared/Modal/LoadingModal";
import axiosInstance from "../../services/axios";

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

function Presentation() {
  const [slides, setSlides] = useState([]);
  const { state } = useLocation();
  const { presentationId } = useParams();
  const { isLoading } = useGetAllSlidesQuery(
    state.user._id,
    presentationId,
    setSlides,
  );

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <Wrapper>
      <MainHeader userInfo={state.user}>
        <PresentationHeader />
      </MainHeader>
      <Section>
        <SlideNavigator slides={slides} />
        <SlideCanvasLayout objects={state.objects} />
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
