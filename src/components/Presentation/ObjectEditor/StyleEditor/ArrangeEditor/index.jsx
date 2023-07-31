import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../../../../../services/axios";
import LoadingModal from "../../../../Shared/Modal/LoadingModal";

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  return loggedInUser;
}
const user = getUser();
const userId = user._id;

function useGetSlidesQuery() {
  const { presentationId, slideId } = useParams();
  const { data } = useQuery(["slides", slideId], async () => {
    const response = await axiosInstance.get(
      `/users/${userId}/presentations/${presentationId}/slides/${slideId}/`,
    );
    return response.data;
  });
  return { data };
}

function updateZindexSequence(
  currentSequence,
  droppedObjectId,
  targetObjectId,
) {
  const droppedIndex = currentSequence.findIndex(
    (overlay) => overlay === droppedObjectId,
  );
  const targetIndex = currentSequence.findIndex(
    (overlay) => overlay === targetObjectId,
  );
  const newSequence = [...currentSequence];
  const [removed] = newSequence.splice(droppedIndex, 1);
  newSequence.splice(targetIndex, 0, removed);
  return newSequence;
}

function updateObjectSequence(currentSequence, currentObjects) {
  const newObjects = currentSequence.map((id) =>
    currentObjects.find((object) => object._id === id),
  );
  return newObjects;
}

function ArrangeEditor() {
  const { data, isLoading, isError } = useGetSlidesQuery();
  const [zIndexSequence, setZIndexSequence] = useState(null);
  const { presentationId, slideId } = useParams();
  const queryClient = useQueryClient();

  const updateSlideMutation = useMutation(
    ({ newZIndexSequence, newObjectSequence }) =>
      axiosInstance.put(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/zindex`,
        { newZIndexSequence, newObjectSequence },
      ),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("slides");
      },
    },
  );

  useEffect(() => {
    if (data && data.slide) {
      setZIndexSequence(data.slide.zIndexSequence);
    }
  }, [data]);

  function handleDragStart(event, id) {
    event.dataTransfer.setData("text/plain", id);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  async function handleDrop(event, id) {
    event.preventDefault();

    const droppedObjectId = event.dataTransfer.getData("text/plain");
    const targetObjectId = id;

    const newZIndexSequence = updateZindexSequence(
      zIndexSequence,
      droppedObjectId,
      targetObjectId,
    );

    const newObjectSequence = updateObjectSequence(
      newZIndexSequence,
      data.slide.objects,
    );

    setZIndexSequence(newZIndexSequence);
    updateSlideMutation.mutate({
      newZIndexSequence,
      newObjectSequence,
    });
  }

  if (isLoading) {
    return <LoadingModal />;
  }

  if (isError) {
    return <div>Error occurred!</div>;
  }

  if (!zIndexSequence) {
    return null;
  }

  return (
    <div>
      {zIndexSequence.map((overlay) => {
        const targetObject = data.slide.objects.find(
          (object) => object._id.toString() === overlay.toString(),
        );
        const objectType = targetObject?.type;
        return (
          <Wrapper key={overlay}>
            <List
              draggable="true"
              onDragStart={(event) => handleDragStart(event, overlay)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, overlay)}
            >
              <Item>{objectType}</Item>
            </List>
          </Wrapper>
        );
      })}
    </div>
  );
}

const Wrapper = styled.div`
  overflow-y: auto;
  align-items: center;
`;

const List = styled.div`
  background-color: #dfdfdf;
  width: 90%;
  padding: 10px 5px;
  margin: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #f1c5f1;
    cursor: pointer;
  }
`;

const Item = styled.div`
  height: 10px;
  padding: 5px 10px;
  border-radius: 10px;
`;

export default ArrangeEditor;
