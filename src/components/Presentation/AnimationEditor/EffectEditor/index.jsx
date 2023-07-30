import { useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { styled } from "styled-components";
import { useContext } from "react";
import { ObjectContext } from "../../../../Contexts/ObjectContext";
import axiosInstance from "../../../../services/axios";

function EffectEditor() {
  const queryClient = useQueryClient();
  const { selectedObjectId } = useContext(ObjectContext);

  function getUser() {
    const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

    return loggedInUser;
  }
  const user = getUser();
  const userId = user._id;
  const objectId = selectedObjectId;
  const { presentationId, slideId } = useParams();

  const useAddAnimationMutation = useMutation({
    mutationFn: async (type) => {
      const response = await axiosInstance.post(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects/${objectId}/animations`,
        { animationType: type },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("presentations");
    },
  });

  function handleClick(type) {
    useAddAnimationMutation.mutate(type);
  }

  return (
    <List>
      <Button onClick={() => handleClick("fade-in")} value="fade-in">
        fade in
      </Button>
      <Button onClick={() => handleClick("block-wipe")} value="block-wipe">
        block wipe
      </Button>
      <Button onClick={() => handleClick("3d-flip")} value="3d-flip">
        3d flip
      </Button>
    </List>
  );
}

export default EffectEditor;

const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  padding-left: 35px;
  padding-right: 35px;
`;

const Button = styled.button`
  padding: 5px 10px;
  &:hover {
    background-color: #dfdfdf;
    cursor: pointer;
  }
`;
