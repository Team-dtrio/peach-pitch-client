import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../services/axios";

// function getUser() {
//   const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

//   return loggedInUser;
// }
// const user = getUser();
// const userId = user._id;

// function useGetSlidesQuery() {
//   const { presentationId, slideId } = useParams();
//   const { data } = useQuery(["presentations"], async () => {
//     const response = await axiosInstance.get(
//       `/users/${userId}/presentations/${presentationId}/slides/${slideId}/`,
//     );

//     return response.data;
//   });

//   return { data };
// }

function OrderEditor() {
  //   const response = useGetSlidesQuery();
  //   const { animationSequence } = response.data.slide;
  //   console.log(animationSequence);

  return (
    // {animationSequence.map((animation) => {
    <ol>
      <li>a</li>
      <li>b</li>
      <li>c</li>
    </ol>
    // })
    // }
  );
}

export default OrderEditor;
