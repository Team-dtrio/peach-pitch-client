import { styled } from "styled-components";
import SlideCanvas from "../../Presentation/SlideCanvasLayout/SlideCanvas";

function CreatePresentation() {
  return (
    <MainArticle>
      <h2>새 프레젠테이션</h2>
      <SlideCanvas
        canvasSpec={{ w: 250, h: 150, scaleX: 1, scaleY: 1 }}
        objSpec={{ x: 50, y: 50, w: 250, h: 200, scaleX: 1, scaleY: 1 }} />
    </MainArticle>
  );
}

const MainArticle = styled.article`
  padding: 15px 0;
  padding-left: 30px;
`;

export default CreatePresentation;
