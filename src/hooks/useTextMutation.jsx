import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/axios";
import { ObjectContext } from "../contexts/ObjectContext";

function useTextMutation() {
  const queryClient = useQueryClient();
  const { selectedObjectId, selectedObjectType } = useContext(ObjectContext);

  function getUser() {
    const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
    return loggedInUser;
  }

  const user = getUser();
  const userId = user._id;
  const objectId = selectedObjectId;
  const { presentationId, slideId } = useParams();

  const mutation = useMutation(
    (updateData) =>
      axiosInstance.put(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects/${objectId}/`,
        updateData,
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["objects", slideId]);
      },
    },
  );

  return {
    mutation,
    selectedObjectType,
  };
}

export default useTextMutation;
