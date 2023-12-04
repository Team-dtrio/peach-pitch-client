import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import ScreenShowLayout from "./ScreenShowLayout";

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
      callback(data?.slides);
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
  const [isEditMode, setIsEditMode] = useState(true);
  const [slides, setSlides] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(null);
  const [activeAnimationIndex, setActiveAnimationIndex] = useState(null);
  const { presentationId } = useParams();
  const { isLoading } = useGetAllSlidesQuery(
    user._id,
    presentationId,
    setSlides,
  );

  function handlePlay() {
    setIsEditMode(false);
    setActiveSlideIndex(0);
    setActiveAnimationIndex(-1);
  }

  const handleKeyDown = useCallback(
    (event) => {
      const currentAnimationSequence =
        slides[activeSlideIndex]?.animationSequence;

      switch (event.key) {
        case "ArrowRight":
          if (activeAnimationIndex < currentAnimationSequence.length) {
            setActiveAnimationIndex(activeAnimationIndex + 1);
          }

          if (
            activeAnimationIndex === currentAnimationSequence.length - 1 &&
            activeSlideIndex < slides.length
          ) {
            setActiveSlideIndex(activeSlideIndex + 1);
            setActiveAnimationIndex(-1);
          }
          break;
        case "ArrowLeft":
          if (activeSlideIndex > 0) {
            setActiveSlideIndex(activeSlideIndex - 1);
          }
          break;
        default:
          break;
      }
    },
    [activeSlideIndex, activeAnimationIndex, slides],
  );

  useAuthRedirect(user);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSlideIndex, handleKeyDown, slides]);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <Wrapper>
      <MainHeader userInfo={user}>
        <PresentationHeader handlePlay={handlePlay} />
      </MainHeader>
      <Section>
        <SlideNavigator slides={slides} />
        <SlideCanvasLayout />
        <ObjectEditor />
      </Section>
      {!isEditMode && (
        <ScreenShowLayout
          slides={slides}
          activeSlideIndex={activeSlideIndex}
          activeAnimationIndex={activeAnimationIndex}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 17vh 83vh;

  @media (max-height: 800px) {
    grid-template-rows: 20vh 80vh;
  }
`;
const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  height: 100%;
`;

export default Presentation;
