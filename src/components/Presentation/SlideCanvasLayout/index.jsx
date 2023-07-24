import { styled } from "styled-components";
import SlideCanvas from "./SlideCanvas";

function SlideCanvasLayout({ objects }) {
  return (
    <Wrapper>
      <EntireLayout>
        <SlideCanvas
          canvasSpec={{ w: 800, h: 500, scaleX: 1, scaleY: 1 }}
          objects={objects}
        />
      </EntireLayout>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin: auto;
`;
const EntireLayout = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export default SlideCanvasLayout;
