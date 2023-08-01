import { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { throttle } from "lodash";
import Boundary from "../Boundary";
import { ObjectContext } from "../../../../../contexts/ObjectContext";
import axiosInstance from "../../../../../services/axios";

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  return loggedInUser;
}

function StyledImageComponent({ spec }) {
  return (
    <StyledImageBox spec={spec}>
      <StyledImage src={spec.imageUrl} alt="" />
    </StyledImageBox>
  );
}

function Image({ id, spec, onContextMenu }) {
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [imageSpec, setImageSpec] = useState(spec);
  const user = getUser();
  const userId = user._id;
  const { presentationId, slideId } = useParams();
  const queryClient = useQueryClient();
  const { selectedObjectId, selectedObjectType, selectObject } =
    useContext(ObjectContext);

  const isSelected =
    id === selectedObjectId && spec.type === selectedObjectType;

  const handleImageClick = (event) => {
    event.stopPropagation();
    selectObject(id, spec.type);
  };

  const updatedImageSpec = {
    type: imageSpec.type,
    coordinates: { x: imageSpec.x, y: imageSpec.y },
    dimensions: { width: imageSpec.width, height: imageSpec.height },
    boundaryVertices: imageSpec.boundaryVerticles,
    currentAnimation: imageSpec.currentAnimation,
    _id: imageSpec._id,
    Image: {
      imageUrl: imageSpec.fillColor,
      borderColor: imageSpec.borderColor,
    },
  };
  const updateImageSpec = useMutation(
    async () => {
      const objectId = imageSpec._id;
      const response = await axiosInstance.put(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects/${objectId}`,
        updatedImageSpec,
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("slides");
      },
    },
  );

  const onVertexDrag = useCallback(
    (draggedVertexIndex) => (event) => {
      event.preventDefault();
      event.stopPropagation();

      const initialPosition = { x: event.clientX, y: event.clientY };
      const initialSpec = { ...imageSpec };

      const moveHandler = throttle((moveEvent) => {
        const newPosition = {
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        };

        let newImageSpec = { ...imageSpec };
        const widthChange = newPosition.x - initialPosition.x;
        const aspectRatio = imageSpec.width / imageSpec.height;

        switch (draggedVertexIndex) {
          case 0:
          case 6:
            newImageSpec = {
              ...newImageSpec,
              width: initialSpec.width - widthChange,
              height: (initialSpec.width - widthChange) / aspectRatio,
            };
            break;
          case 2:
          case 4:
            newImageSpec = {
              ...newImageSpec,
              width: initialSpec.width + widthChange,
              height: (initialSpec.width + widthChange) / aspectRatio,
            };
            break;
          case 1:
          case 5:
          case 3:
          case 7:
            break;
          default:
            break;
        }

        setImageSpec(newImageSpec);
      }, 200);

      const upHandler = async () => {
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", upHandler);
        await updateImageSpec.mutateAsync();
      };

      document.addEventListener("mousemove", moveHandler);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", moveHandler);
        },
        { once: true },
      );
    },
    [imageSpec, updateImageSpec],
  );

  function onImageDrag(event) {
    event.stopPropagation();
    event.preventDefault();

    const initialPosition = {
      x: event.clientX - imageSpec.x,
      y: event.clientY - imageSpec.y,
    };

    const moveHandler = throttle((moveEvent) => {
      setImageSpec((prevSpec) => ({
        ...prevSpec,
        x: moveEvent.clientX - initialPosition.x,
        y: moveEvent.clientY - initialPosition.y,
      }));
    }, 150);

    const upHandler = async () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
      await updateImageSpec.mutateAsync();
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  }

  useEffect(() => {
    setImageSpec(spec);
  }, [spec]);

  useEffect(() => {
    const offset = { x: 1, y: 1 };

    const baseVertices = [
      { x: imageSpec.x, y: imageSpec.y },
      { x: imageSpec.x + imageSpec.width / 2, y: imageSpec.y },
      { x: imageSpec.x + imageSpec.width, y: imageSpec.y },
      {
        x: imageSpec.x + imageSpec.width,
        y: imageSpec.y + imageSpec.height / 2,
      },
      {
        x: imageSpec.x + imageSpec.width,
        y: imageSpec.y + imageSpec.height,
      },
      {
        x: imageSpec.x + imageSpec.width / 2,
        y: imageSpec.y + imageSpec.height,
      },
      { x: imageSpec.x, y: imageSpec.y + imageSpec.height },
      { x: imageSpec.x, y: imageSpec.y + imageSpec.height / 2 },
    ];

    const updatedBoundaryVertices = baseVertices.map((vertex) => ({
      x: vertex.x + offset.x,
      y: vertex.y + offset.y,
    }));

    setBoundaryVertices(updatedBoundaryVertices);
  }, [imageSpec]);

  return (
    <div
      onClick={handleImageClick}
      onMouseDown={onImageDrag}
      onContextMenu={onContextMenu}
      aria-hidden="true"
    >
      <StyledImageComponent spec={imageSpec} />
      {isSelected && (
        <Boundary
          boundaryVertices={boundaryVertices}
          onVertexDrag={onVertexDrag}
        />
      )}
    </div>
  );
}

const StyledImageBox = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  border: 1px solid ${({ spec }) => spec.borderColor};
  user-select: none;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Image;
