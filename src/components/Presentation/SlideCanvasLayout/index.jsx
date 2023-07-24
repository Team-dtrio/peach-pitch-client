import { styled } from "styled-components";
import SlideCanvas from "./SlideCanvas";

function SlideCanvasLayout() {
  return (
    <Wrapper>
      <EntireLayout>
        <SlideCanvas
          canvasSpec={{ w: 800, h: 500, scaleX: 1, scaleY: 1 }}
          objSpec={{ x: 50, y: 50, w: 250, h: 200, scaleX: 1, scaleY: 1 }} />
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
