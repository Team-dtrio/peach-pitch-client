import { styled } from "styled-components";
import { Link } from "react-router-dom";
import SlideCanvas from "../../Presentation/SlideCanvasLayout/SlideCanvas";

function MyPresentation({ presentations }) {
  return (
    <MainArticle>
      <h2>내 프레젠테이션</h2>
      <Link to="/presentations/test">
        <SlideCanvas
          canvasSpec={{ w: 250, h: 150, scaleX: 1, scaleY: 1 }}
          objSpec={{ x: 50, y: 50, w: 150, h: 100, scaleX: 1, scaleY: 1 }} />
      </Link>
    </MainArticle>
  );
}

const MainArticle = styled.article`
  padding: 15px 0;
  padding-left: 30px;
`;

export default MyPresentation;
