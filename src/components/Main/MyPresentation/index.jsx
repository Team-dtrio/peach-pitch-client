import { styled } from "styled-components";
import { Link } from "react-router-dom";
import DynamicObject from "../../Presentation/ScreenShowLayout/DynamicObject";

function MyPresentation({ presentations }) {
  return (
    <Section>
      <h2>내 프레젠테이션</h2>
      <Container>
        {presentations.map((presentation) => {
          const { objects = [] } = presentation.slides[0];
          const thumbnailObjects = objects
            ?.filter((object) => object !== null)
            .map(
              (
                { _id, type, coordinates, dimensions, currentAnimation },
                objectIndex,
                currentObjects,
              ) => {
                const features = currentObjects[objectIndex][type];

                return {
                  _id,
                  type,
                  x: coordinates.x,
                  y: coordinates.y,
                  width: dimensions.width,
                  height: dimensions.height,
                  currentAnimation,
                  ...features,
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
                {thumbnailObjects &&
                  thumbnailObjects.length > 0 &&
                  thumbnailObjects.map((object) => (
                    <DynamicObject key={object._id} objectSpec={object} />
                  ))}
              </Thumbnail>
              <ThumbnailTitle>{presentation.title}</ThumbnailTitle>
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
  color: #222;

  &:visited {
    color: #222;
  }
`;
const Section = styled.section`
  padding: 15px 0;
  padding-left: 50px;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-bottom: 10px;
`;
const Thumbnail = styled.div`
  position: relative;
  width: 20vw;
  height: 25vh;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const ThumbnailTitle = styled.h3`
  padding-left: 33%;
`;

export default MyPresentation;
