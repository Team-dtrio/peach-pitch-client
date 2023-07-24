import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axios";

function useGetAllSlidesQuery(userId, presentationId) {
  const query = useQuery({
    queryKey: ["slides"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/users/${userId}/presentations/${presentationId}/slides`,
      );

      return response;
    },
  });

  return query;
}

export default useGetAllSlidesQuery;
