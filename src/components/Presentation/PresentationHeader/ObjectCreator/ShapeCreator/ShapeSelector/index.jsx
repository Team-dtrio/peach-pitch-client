import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { styled } from "styled-components";
import axiosInstance from "../../../../../../services/axios";

import rectangleUrl from "../../../../../../assets/icon-rectangle.svg";
import squareUrl from "../../../../../../assets/icon-square.svg";
import circleUrl from "../../../../../../assets/icon-circle.svg";

function useCreateObjectMutation(slideIdParam) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ userId, presentationId, slideId, type }) => {
      const { data } = await axiosInstance.post(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects`,
        {
          type,
        },
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("slides");
      queryClient.invalidateQueries(["objects", slideIdParam]);
    },
  });

  return mutation;
}

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

  return loggedInUser;
}

function ShapeSelector({ onShapeSelect }) {
  const user = getUser();
  const { presentationId, slideId } = useParams();
  const { mutate } = useCreateObjectMutation(slideId);

  function onButtonClick(type) {
    mutate({ userId: user._id, presentationId, slideId, type });
    onShapeSelect(type);
  }

  return (
    <Wrapper>
      <Button onClick={() => onButtonClick("Square")}>
        <Image src={rectangleUrl} />
      </Button>
      <Button onClick={() => onButtonClick("Triangle")}>
        <Image src={squareUrl} />
      </Button>
      <Button onClick={() => onButtonClick("Circle")}>
        <Image src={circleUrl} />
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  left: 49.5%;
  bottom: -50px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.beige};
`;
const Button = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;
const Image = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 10px;

  &:nth-of-type(2) {
    width: 22px;
    height: 21px;
  }
`;

export default ShapeSelector;
