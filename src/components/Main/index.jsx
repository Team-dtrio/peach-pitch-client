import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../services/axios";

import MainHeader from "./MainHeader";
import CreatePresentation from "./CreatePresentation";
import MyPresentation from "./MyPresentation";
import LoadingModal from "../Shared/Modal/LoadingModal";

function useGetPresentationsQuery(userId, callback) {
  const query = useQuery({
    queryKey: ["presentations"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/users/${userId}/presentations`,
      );

      return response;
    },
    onSuccess: ({ data }) => {
      callback(data.presentations);
    },
  });

  return query;
}

function Main() {
  const [presentations, setPresentations] = useState([]);
  const { state: user } = useLocation();
  const { isLoading } = useGetPresentationsQuery(user._id, setPresentations);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <>
      <MainHeader userInfo={user} />
      <main>
        <CreatePresentation />
        <MyPresentation presentations={presentations} />
      </main>
    </>
  );
}

export default Main;
