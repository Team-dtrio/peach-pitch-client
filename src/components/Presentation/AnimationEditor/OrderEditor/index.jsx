import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../services/axios";
import LoadingModal from "../../../Shared/Modal/LoadingModal";

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

  return loggedInUser;
}
const user = getUser();
const userId = user._id;

function useGetSlidesQuery() {
  const { presentationId, slideId } = useParams();
  const { data } = useQuery(["presentations"], async () => {
    const response = await axiosInstance.get(
      `/users/${userId}/presentations/${presentationId}/slides/${slideId}/`,
    );

    return response.data;
  });

  return { data };
}

function OrderEditor() {
  const { data, isLoading, isError } = useGetSlidesQuery();

  if (isLoading) {
    return <LoadingModal />;
  }

  if (isError) {
    return <div>Error occurred!</div>;
  }

  const animationSequence = data?.slide?.animationSequence;

  if (!animationSequence) {
    return null;
  }

  return (
    <div>
      {animationSequence?.map((animation) => (
        <li key={animation.objectId}>
          {animation.animationEffect}
          {animation.objectId}
        </li>
      ))}
    </div>
  );
}

export default OrderEditor;
