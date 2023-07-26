import { useState, useEffect, useCallback } from "react";
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
      const currentSlide = presentation.slides.find(
        (slide) => slide._id === slideId,
      );
      const currentObjects = currentSlide.objects.map(
        ({ type, _id, coordinates, dimensions }) => ({
          type,
          _id,
          x: coordinates.x,
          y: coordinates.y,
          width: dimensions.width,
          height: dimensions.height,
        }),
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
  const [currentObject, setCurrentObject] = useState({});
  const [dragging, setDragging] = useState(false);

  useGetPresentationQuery(user._id, presentationId, slideId, setCurrentObjects);

  function pointObject(object) {
    setCurrentObject(object);
  }

  function handleMouseDown(object) {
    console.log("Selected object ID:", object._id);
    setCurrentObject(object);
    setDragging(true);
  }

  const handleMouseMove = useCallback(
    (event) => {
      if (dragging) {
        setCurrentObject((prev) => ({
          ...prev,
          x: currentObject.x + event.movementX,
          y: currentObject.y + event.movementY,
        }));
      }
    },
    [dragging, currentObject],
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

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
          pointedObject={currentObject}
          pointObject={pointObject}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
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
