import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";

import MainHeader from "../Main/MainHeader";
import SlideNavigator from "./SlideNavigator";
import SlideCanvasLayout from "./SlideCanvasLayout";
import ObjectEditor from "./ObjectEditor";
import PresentationHeader from "./PresentationHeader";
import useGetAllSlidesQuery from "../../hooks/queries/useGetAllSlidesQuery";
import LoadingModal from "../Shared/Modal/LoadingModal";

function Presentation() {
  const [slides, setSlides] = useState([]);
  const { state } = useLocation();
  const { presentationId } = useParams();
  const { data, isLoading } = useGetAllSlidesQuery(
    state.user._id,
    presentationId,
  );

  useEffect(() => {
    if (data) {
      setSlides(data.data.slides);
    }
  }, [data]);

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
