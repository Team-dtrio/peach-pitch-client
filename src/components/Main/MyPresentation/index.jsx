import { styled } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import NonEditableObject from "../../Presentation/ScreenShowLayout/NonEditableObject";
import axiosInstance from "../../../services/axios";

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  return loggedInUser;
}
const user = getUser();
const userId = user?._id;

function MyPresentation({ presentations }) {
  const location = useLocation();
  const queryClient = useQueryClient();
  const [selectedPresentationId, setSelectedPresentationId] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const useDeletePresentationMutation = useMutation({
    mutationFn: async (presentationId) => {
      const response = await axiosInstance.delete(
        `/users/${userId}/presentations/${presentationId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries("presentations");
    },
  });

  useEffect(() => {
    queryClient.refetchQueries("presentations");
  }, [location, queryClient]);

  function handleContextMenu(event, id) {
    event.preventDefault();
    setSelectedPresentationId(id);
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  }

  function handleCloseContextMenu() {
    setContextMenu({ visible: false, x: 0, y: 0 });
  }

  async function handleDeletePresentation() {
    try {
      await useDeletePresentationMutation.mutateAsync(selectedPresentationId);
      handleCloseContextMenu();
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <Section>
      <h2>내 프레젠테이션</h2>
      <Container>
        {presentations.map((presentation) => {
          if (
            !presentation ||
            !presentation.slides ||
            !presentation.slides[0]
          ) {
            return null;
          }
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
              onContextMenu={(event) =>
                handleContextMenu(event, presentation._id)
              }
            >
              <Thumbnail>
                {thumbnailObjects.length > 0 &&
                  thumbnailObjects.map((object) => (
                    <NonEditableObject key={object._id} objectSpec={object} />
                  ))}
                {thumbnailObjects.map((object) => (
                  <NonEditableObject
                    key={object._id}
                    objectSpec={object}
                    isThumbnail
                  />
                ))}
              </Thumbnail>
              <ThumbnailTitle>{presentation.title}</ThumbnailTitle>
            </StyledLink>
          );
        })}
      </Container>
      {contextMenu.visible && (
        <ContextMenu style={{ top: contextMenu.y, left: contextMenu.x }}>
          <MenuItem onClick={handleDeletePresentation}>Delete</MenuItem>
        </ContextMenu>
      )}
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
  padding-left: 25%;
`;

const ContextMenu = styled.div`
  position: absolute;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  padding: 10px;
  border-radius: 5px;
`;

const MenuItem = styled.div`
  padding: 5px 10px;
  &:hover {
    background-color: #dfdfdf;
    cursor: pointer;
  }
`;

export default MyPresentation;
