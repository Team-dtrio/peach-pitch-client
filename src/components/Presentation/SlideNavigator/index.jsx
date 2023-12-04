import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";

import axiosInstance from "../../../services/axios";
import NonEditableObject from "../ScreenShowLayout/NonEditableObject";

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  return loggedInUser;
}
const user = getUser();
const userId = user?._id;

function useGetAllSlidesQuery() {
  const { presentationId } = useParams();
  const query = useQuery({
    queryKey: ["slides"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/users/${userId}/presentations/${presentationId}/slides`,
      );
      return response.data.slides;
    },
  });

  return query;
}

function SlideNavigator() {
  const { presentationId } = useParams();
  const [selectedSlideId, setSelectedSlideId] = useState(null);

  const { data = {} } = useGetAllSlidesQuery(userId, presentationId);

  const slidesState = data?.data?.slides;

  const queryClient = useQueryClient();

  const useAddSlideMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        `/users/${userId}/presentations/${presentationId}/slides`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("slides");
    },
  });

  const useDeleteSlideMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/users/${userId}/presentations/${presentationId}/slides/${selectedSlideId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("slides");
    },
  });

  const useUpdateSlideOrderMutation = useMutation({
    mutationFn: async ({ newOrder }) => {
      const response = await axiosInstance.put(
        `/users/${userId}/presentations/${presentationId}/slides`,
        { newOrder },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("slides");
    },
  });

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  function handleContextMenu(event, id) {
    event.preventDefault();
    setSelectedSlideId(id);
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  }

  function handleCloseContextMenu() {
    setContextMenu({ visible: false, x: 0, y: 0 });
  }

  function updateSlideOrder(currentSlides, droppedSlideId, targetSlideId) {
    const droppedIndex = currentSlides.findIndex(
      (slide) => slide._id === droppedSlideId,
    );
    const targetIndex = currentSlides.findIndex(
      (slide) => slide._id === targetSlideId,
    );

    const newSlides = [...currentSlides];
    const [removed] = newSlides.splice(droppedIndex, 1);
    newSlides.splice(targetIndex, 0, removed);

    return newSlides;
  }

  async function handleAddSlide() {
    try {
      await useAddSlideMutation.mutateAsync();
      handleCloseContextMenu();
    } catch (error) {
      throw new Error(error);
    }
  }

  async function handleDeleteSlide() {
    try {
      await useDeleteSlideMutation.mutateAsync();
      handleCloseContextMenu();
    } catch (error) {
      throw new Error(error);
    }
  }

  function handleDragStart(event, id) {
    event.dataTransfer.setData("text/plain", id);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  async function handleDrop(event, id) {
    event.preventDefault();

    const droppedSlideId = event.dataTransfer.getData("text/plain");
    const targetSlideId = id;

    const newSlides = updateSlideOrder(
      slidesState,
      droppedSlideId,
      targetSlideId,
    );

    const newOrder = newSlides.map((slide) => slide._id);

    await useUpdateSlideOrderMutation.mutateAsync({ newOrder });
  }

  return (
    <Wrapper>
      {slidesState.map((slide) => {
        const thumbnailObjects = slide.objects.map(
          (
            { type, _id, coordinates, dimensions, currentAnimation },
            objectIndex,
            currentObjects,
          ) => {
            const features = currentObjects[objectIndex][type];

            return {
              type,
              _id,
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
            key={slide._id}
            to={`/presentations/${presentationId}/${slide._id}`}
            onDragStart={(event) => handleDragStart(event, slide._id)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, slide._id)}
            onContextMenu={(event) => handleContextMenu(event, slide._id)}
            onClick={handleCloseContextMenu}
          >
            <ThumbnailWrapper draggable="true">
              {thumbnailObjects.map((object) => (
                <NonEditableObject
                  key={object._id}
                  objectSpec={object}
                  isThumbnail
                />
              ))}
            </ThumbnailWrapper>
          </StyledLink>
        );
      })}
      {contextMenu.visible && (
        <ContextMenu style={{ top: contextMenu.y, left: contextMenu.x }}>
          <MenuItem onClick={handleAddSlide}>Add</MenuItem>
          <MenuItem onClick={handleDeleteSlide}>Delete</MenuItem>
        </ContextMenu>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  background-color: #f1efef;
  overflow-y: auto;
  padding: 15px;
`;
const StyledLink = styled(Link)``;
const ThumbnailWrapper = styled.div`
  position: relative;
  margin: 15px auto;
  width: calc(100% - 30px);
  padding-bottom: 66.67%;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: hidden;
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

export default SlideNavigator;
