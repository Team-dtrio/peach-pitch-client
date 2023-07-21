import { styled } from "styled-components";
import MainHeader from "../Main/MainHeader";
import SlideNavigator from "./SlideNavigator";
import SlideCanvasLayout from "./SlideCanvasLayout";
import ObjectEditor from "../ObjectEditor";

function Presentation() {
  return (
    <Wrapper>
      <MainHeader userInfo={{ name: "noop", email: "noop" }} />
      <Section>
        <SlideNavigator />
        <SlideCanvasLayout />
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
