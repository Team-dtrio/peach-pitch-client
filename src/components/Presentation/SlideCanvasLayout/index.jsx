import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import axiosInstance from "../../../services/axios";

import SlideCanvas from "./SlideCanvas";

function useGetPresentationQuery(userId, presentationId, slideId, callback) {
  const query = useQuery({
    queryKey: ["presentation"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/users/${userId}/presentations/${presentationId}`,
      );

      return response;
    },
    onSuccess: ({ data }) => {
      const { presentation } = data;
      const currentSlide = presentation.slides.find((slide) => {
        return slide._id === slideId;
      });
      const currentObjects = currentSlide.objects.map(
        ({ type, _id, coordinates, dimensions }) => {
          return {
            type,
            _id,
            x: coordinates.x,
            y: coordinates.y,
            width: dimensions.width,
            height: dimensions.height,
          };
        },
      );

      callback(currentObjects);
    },
  });

  return query;
}

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

  return loggedInUser;
}

function SlideCanvasLayout() {
  const user = getUser();
  const { presentationId, slideId } = useParams();
  const [currentObjects, setCurrentObjects] = useState([]);
  useGetPresentationQuery(user._id, presentationId, slideId, setCurrentObjects);

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
          objects={currentObjects}
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
