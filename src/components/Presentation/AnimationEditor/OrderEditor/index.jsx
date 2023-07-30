import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../../../../services/axios";
import LoadingModal from "../../../Shared/Modal/LoadingModal";

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  return loggedInUser;
}
const user = getUser();
const userId = user._id;

function useGetSlidesQuery() {
  const { presentationId, slideId } = useParams();
  const { data } = useQuery(["presentations", slideId], async () => {
    const response = await axiosInstance.get(
      `/users/${userId}/presentations/${presentationId}/slides/${slideId}/`,
    );
    return response.data;
  });
  return { data };
}

function updateAnimationSequence(
  currentSequence,
  droppedAnimationId,
  targetAnimationId,
) {
  const droppedIndex = currentSequence.findIndex(
    (animation) => animation.objectId === droppedAnimationId,
  );
  const targetIndex = currentSequence.findIndex(
    (animation) => animation.objectId === targetAnimationId,
  );
  const newSequence = [...currentSequence];
  const [removed] = newSequence.splice(droppedIndex, 1);
  newSequence.splice(targetIndex, 0, removed);
  return newSequence;
}

function OrderEditor() {
  const { data, isLoading, isError } = useGetSlidesQuery();
  const [animationSequence, setAnimationSequence] = useState(null);
  const { presentationId, slideId } = useParams();
  const queryClient = useQueryClient();

  const updateSequenceMutation = useMutation(
    ({ newAnimationSequence }) =>
      axiosInstance.put(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/animations`,
        { newSequence: newAnimationSequence },
      ),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(slideId);
      },
    },
  );

  useEffect(() => {
    if (data && data.slide) {
      setAnimationSequence(data.slide.animationSequence);
    }
  }, [data]);

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  async function handleDrop(event, id) {
    event.preventDefault();

    const droppedAnimationId = event.dataTransfer.getData("text/plain");
    const targetAnimationId = id;

    const newAnimationSequence = updateAnimationSequence(
      animationSequence,
      droppedAnimationId,
      targetAnimationId,
    );

    setAnimationSequence(newAnimationSequence);
    updateSequenceMutation.mutate({
      newAnimationSequence,
    });
  }

  if (isLoading) {
    return <LoadingModal />;
  }

  if (isError) {
    return <div>Error occurred!</div>;
  }

  if (!animationSequence) {
    return null;
  }

  return (
    <div>
      {animationSequence.map((animation) => {
        const relatedObject = data.slide.objects.find(
          (object) => object._id === animation.objectId,
        );
        const objectType = relatedObject ? relatedObject.type : "Not found";
        return (
          <List
            key={animation.objectId}
            draggable="true"
            onDragStart={(event) => handleDragStart(event, animation.objectId)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, animation.objectId)}
          >
            <Item>{animation.animationEffect}</Item>
            <Item>{objectType}</Item>
          </List>
        );
      })}
    </div>
  );
}

const List = styled.div`
  background-color: #dfdfdf;
  width: 90%;
  height: 50px;
  padding: 5px 10px;
  margin: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #f1c5f1;
    cursor: pointer;
  }
`;

const Item = styled.div`
  padding: 5px 10px;
  border-radius: 10px;
`;

export default OrderEditor;
