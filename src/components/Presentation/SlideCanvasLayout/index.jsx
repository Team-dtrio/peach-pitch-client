import { styled } from "styled-components";
import SlideCanvas from "./SlideCanvas";

function SlideCanvasLayout() {
  return (
    <Wrapper>
      <EntireLayout>
        <SlideCanvas spec={{ w: 800, h: 500 }} />
      </EntireLayout>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  margin: auto;
`;
const EntireLayout = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  `;

export default SlideCanvasLayout;
