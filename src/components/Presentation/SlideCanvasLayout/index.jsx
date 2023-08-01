import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { ObjectContext } from "../../../contexts/ObjectContext";
import axiosInstance from "../../../services/axios";

import SlideCanvas from "./SlideCanvas";

function useGetAllObjectsQuery(userId, presentationId, slideId) {
  return useQuery(
    ["objects", slideId],
    async () => {
      const { data } = await axiosInstance.get(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects`,
      );

      const normalizedObjects = data.objects.map(
        (
          { _id, type, coordinates, dimensions, currentAnimation },
          index,
          objects,
        ) => {
          const features = objects[index][type];

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

      return normalizedObjects;
    },
    { staleTime: 0 },
  );
}

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

  return loggedInUser;
}

function SlideCanvasLayout() {
  const { presentationId, slideId } = useParams();
  const user = getUser();
  const queryClient = useQueryClient();

  const { data = [] } = useGetAllObjectsQuery(
    user._id,
    presentationId,
    slideId,
  );

  const { selectObject, selectedObjectId } = useContext(ObjectContext);

  const mutation = useMutation(
    (objectId) =>
      axiosInstance.delete(
        `/users/${user._id}/presentations/${presentationId}/slides/${slideId}/objects/${objectId}`,
      ),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["objects", slideId]);
      },
    },
  );

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleRightClick = (e, objectId) => {
    e.preventDefault();
    selectObject(objectId);
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleContextMenuClose = () => {
    setContextMenu({
      visible: false,
      x: 0,
      y: 0,
    });
  };

  const handleDeleteObject = () => {
    mutation.mutate(selectedObjectId);
    handleContextMenuClose();
  };

  return (
    <Wrapper onClick={handleContextMenuClose}>
      <EntireLayout>
        <SlideCanvas
          canvasSpec={{
            width: 800,
            height: 500,
            scaleX: 1,
            scaleY: 1,
          }}
          objects={data}
          selectObject={selectObject}
          selectedObjectId={selectedObjectId}
          onObjectRightClick={handleRightClick}
        />
      </EntireLayout>
      {contextMenu.visible && (
        <ContextMenu style={{ top: contextMenu.y, left: contextMenu.x }}>
          <MenuItem onClick={handleDeleteObject}>Delete</MenuItem>
        </ContextMenu>
      )}
    </Wrapper>
  );
}

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

const Wrapper = styled.section`
  margin: auto;
`;

const EntireLayout = styled.div`
  margin: auto;
`;

export default SlideCanvasLayout;
