import { styled } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import SlideCanvas from "../../Presentation/SlideCanvasLayout/SlideCanvas";

function MyPresentation({ presentations }) {
  const { state: user } = useLocation();

  return (
    <MainArticle>
      <h2>내 프레젠테이션</h2>
      <Container>
        {presentations.map((presentation) => {
          return (
            <Link
              key={presentation._id}
              to={`/presentations/${presentation._id}`}
              state={user}
            >
              <SlideCanvas
                canvasSpec={{ w: 250, h: 150, scaleX: 1, scaleY: 1 }}
                objSpec={{ x: 50, y: 50, w: 150, h: 100, scaleX: 1, scaleY: 1 }}
              />
              <p>{presentation.title}</p>
            </Link>
          );
        })}
      </Container>
    </MainArticle>
  );
}

const MainArticle = styled.article`
  padding: 15px 0;
  padding-left: 30px;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

export default MyPresentation;
