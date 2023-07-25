import { styled } from "styled-components";
import { Link } from "react-router-dom";
import SlideCanvas from "../../Presentation/SlideCanvasLayout/SlideCanvas";

function MyPresentation({ presentations }) {
  return (
    <Section>
      <h2>내 프레젠테이션</h2>
      <Container>
        {presentations.map((presentation, index) => {
          const { objects } = presentation.slides[0];
          const thumbnailObjects = objects.map(
            ({ type, _id, coordinates, dimensions }) => {
              return {
                type,
                _id,
                x: coordinates.x,
                y: coordinates.y,
                width: dimensions.width,
                height: dimensions.height,
              };
            },
          );

          return (
            <StyledLink
              key={presentation._id}
              to={`/presentations/${presentation._id}/${presentation.slides[0]._id}`}
              state={{ objects }}
            >
              <Thumbnail>
                <SlideCanvas
                  canvasSpec={{
                    width: 250,
                    height: 150,
                    scaleX: 250 / 800,
                    scaleY: 150 / 500,
                    translate: "-100%, -100%",
                  }}
                  objects={thumbnailObjects}
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
  display: relative;
  text-align: center;

  h3 {
    transform: translate(-100%, -100%);
  }
`;

export default MyPresentation;
