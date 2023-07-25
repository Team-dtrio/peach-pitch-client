import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

import MainHeader from "./MainHeader";
import CreatePresentation from "./CreatePresentation";
import MyPresentation from "./MyPresentation";
import LoadingModal from "../Shared/Modal/LoadingModal";
import { AuthContext } from "../../contexts/AuthContext";

function useGetPresentationsQuery(userId, isUserLoading, callback) {
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
    onError: (error) => {
      console.log("err", error);
    },
    enabled: !!userId,
  });

  return query;
}

function Main() {
  const { firebaseUser, isUserLoading } = useContext(AuthContext);
  const [presentations, setPresentations] = useState([]);
  const { isFetched, isLoading } = useGetPresentationsQuery(
    firebaseUser?._id,
    isUserLoading,
    setPresentations,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoading) {
      return;
    }

    if (!firebaseUser) {
      navigate("/login");

      return;
    }

    navigate("/");
  }, [isUserLoading, firebaseUser, navigate]);

  if (isUserLoading || isLoading) {
    return <LoadingModal />;
  }

  return (
    <>
      <MainHeader userInfo={isFetched && firebaseUser} />
      <main>
        <CreatePresentation userInfo={isFetched && firebaseUser} />
        <MyPresentation presentations={presentations} />
      </main>
    </>
  );
}

export default Main;
