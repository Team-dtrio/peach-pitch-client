import { styled } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import SlideCanvas from "../../Presentation/SlideCanvasLayout/SlideCanvas";

function MyPresentation({ presentations }) {
  const { state: user } = useLocation();

  return (
    <Section>
      <h2>내 프레젠테이션</h2>
      <Container>
        {presentations.map((presentation, index) => {
          const objects = presentation.slides[index].objects;

          return (
            <StyledLink
              key={presentation._id}
              to={`/presentations/${presentation._id}/${presentation.slides[0]._id}`}
              state={{ user, objects }}
            >
              <Thumbnail>
                <SlideCanvas
                  canvasSpec={{ w: 250, h: 150, scaleX: 1, scaleY: 1 }}
                  objects={objects}
                />
                <h3>{presentation.title}</h3>
              </Thumbnail>
            </StyledLink>
          );
        })}
      </Container>
    </Section>
  );
}

const StyledLink = styled(Link)`
  margin-bottom: 10px;
  text-decoration: none;

  &:visited {
    color: #222;
  }
`;
const Section = styled.section`
  padding: 15px 0;
  padding-left: 30px;
`;
const Container = styled.div`
  display: flex;
  flex: 4;
  margin-bottom: 10px;
`;
const Thumbnail = styled.section`
  text-align: center;
`;

export default MyPresentation;
