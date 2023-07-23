import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../services/axios";

function useCreatePresentationMutation() {
  const mutation = useMutation({
    mutationFn: async ({ userId, title }) => {
      const { data } = await axiosInstance.post(
        `/users/${userId}/presentations`,
        { title },
      );

      return data;
    },
    onSuccess: (data) => data,
  });

  return mutation;
}

export default useCreatePresentationMutation;
