import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { styled } from "styled-components";
import axiosInstance from "../../../../../services/axios";

import { AuthContext } from "../../../../../contexts/AuthContext";

import rectangleUrl from "../../../../../assets/icon-rectangle.svg";
import squareUrl from "../../../../../assets/icon-square.svg";
import circleUrl from "../../../../../assets/icon-circle.svg";

function useCreateObjectMutation() {
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
  });

  return mutation;
}

function DropDownMenu() {
  const { firebaseUser } = useContext(AuthContext);
  const [_, setType] = useState("");
  const { mutate } = useCreateObjectMutation();
  const { presentationId, slideId } = useParams();

  function onButtonClick(type) {
    setType(type);

    mutate({ userId: firebaseUser?._id, presentationId, slideId, type });
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

export default DropDownMenu;
