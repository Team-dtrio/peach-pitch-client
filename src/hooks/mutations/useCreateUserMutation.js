import { useQueryClient, useMutation } from "@tanstack/react-query";
import axiosInstance from "../../services/axios";

function useCreateUserMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (userToken) => {
      const { data } = await axiosInstance.post("login", null, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("user");

      return data;
    },
  });

  return mutation;
}

export default useCreateUserMutation;
