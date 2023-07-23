import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axios";

function useGetPresentationsQuery(userId) {
  const query = useQuery({
    queryKey: ["presentations"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/users/${userId}/presentations`,
      );

      return response;
    },
  });

  return query;
}

export default useGetPresentationsQuery;
