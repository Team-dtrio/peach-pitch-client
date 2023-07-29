import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../services/axios";
import SlideCanvas from "./SlideCanvas";

function useGetAllObjectsQuery(userId, presentationId, slideId) {
  return useQuery(["objects", slideId], async () => {
    const { data } = await axiosInstance.get(
      `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects`,
    );
    return data;
  });
}

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

  return loggedInUser;
}

function SlideCanvasLayout() {
  const { presentationId, slideId } = useParams();
  const user = getUser();

  const { data } = useGetAllObjectsQuery(user._id, presentationId, slideId);

  return (
    <Wrapper>
      <EntireLayout>
        <SlideCanvas
          canvasSpec={{
            width: 800,
            height: 500,
            scaleX: 1,
            scaleY: 1,
          }}
          objects={data && data.objects ? data.objects : []}
        />
      </EntireLayout>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin: auto;
`;
const EntireLayout = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export default SlideCanvasLayout;
