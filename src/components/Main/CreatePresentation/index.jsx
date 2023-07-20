import { styled } from "styled-components";
import SlideCanvas from "../../Presentation/SlideCanvasLayout/SlideCanvas";

function CreatePresentation() {
  return (
    <MainArticle>
      <h2>새 프레젠테이션</h2>
      <SlideThumbnail>
        <SlideCanvas spec={{ w: 250, h: 150 }} />
        <SlideCanvas spec={{ w: 250, h: 150 }} />
      </SlideThumbnail>
    </MainArticle>
  );
}

const MainArticle = styled.article`
  padding: 15px 0;
  padding-left: 30px;
`;
const SlideThumbnail = styled.div`
  display: flex;
`;

export default CreatePresentation;
