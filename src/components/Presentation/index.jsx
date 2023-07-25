import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";

import axiosInstance from "../../services/axios";
import { AuthContext } from "../../contexts/AuthContext";

import MainHeader from "../Main/MainHeader";
import SlideNavigator from "./SlideNavigator";
import SlideCanvasLayout from "./SlideCanvasLayout";
import ObjectEditor from "./ObjectEditor";
import PresentationHeader from "./PresentationHeader";
import LoadingModal from "../Shared/Modal/LoadingModal";

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
  const { firebaseUser, isUserLoading } = useContext(AuthContext);
  const [slides, setSlides] = useState([]);
  const { state, currentPath } = useLocation();
  const { presentationId } = useParams();
  const navigate = useNavigate();
  const { isLoading } = useGetAllSlidesQuery(
    firebaseUser?._id,
    presentationId,
    setSlides,
  );

  useEffect(() => {
    if (isUserLoading) {
      return;
    }

    if (!firebaseUser) {
      navigate("/login");
    }

    navigate(currentPath);
  }, [firebaseUser, navigate]);

  if (isUserLoading || isLoading) {
    return <LoadingModal />;
  }

  return (
    <Wrapper>
      <MainHeader userInfo={firebaseUser}>
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
