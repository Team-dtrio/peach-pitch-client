import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../services/axios";

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

export default useCreateObjectMutation;
