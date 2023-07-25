import { styled } from "styled-components";
import SlideCanvas from "./SlideCanvas";

function SlideCanvasLayout({ objects }) {
  return (
    <Wrapper>
      <EntireLayout>
        <SlideCanvas
          canvasSpec={{
            width: 800,
            height: 500,
            scaleX: 1,
            scaleY: 1,
          }}
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
