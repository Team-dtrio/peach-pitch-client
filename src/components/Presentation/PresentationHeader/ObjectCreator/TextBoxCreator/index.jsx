import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import textboxCreatorUrl from "../../../../../assets/oc-icon-text.svg";
import axiosInstance from "../../../../../services/axios";

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

function TextboxCreator() {
  const user = getUser();
  const { presentationId, slideId } = useParams();
  const { mutate } = useCreateObjectMutation(slideId);

  async function onButtonClick() {
    try {
      await mutate({
        userId: user._id,
        presentationId,
        slideId,
        type: "Textbox",
      });
    } catch (error) {
      throw new Error("Failed to create textbox");
    }
  }

  return (
    <Button onClick={onButtonClick}>
      <Image src={textboxCreatorUrl} />
    </Button>
  );
}

const Button = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
`;

export default TextboxCreator;
