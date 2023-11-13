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

function Triangle({ id, spec, onContextMenu }) {
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [triangleSpec, setTriangleSpec] = useState(spec);
  const user = getUser();
  const userId = user._id;
  const { presentationId, slideId } = useParams();
  const queryClient = useQueryClient();

  const { selectedObjectId, selectedObjectType, selectObject } =
    useContext(ObjectContext);

  const isSelected =
    id === selectedObjectId && spec.type === selectedObjectType;

  const handleTriangleClick = (event) => {
    event.stopPropagation();
    selectObject(id, spec.type);
  };

  const updatedTriangleSpec = {
    type: triangleSpec.type,
    coordinates: { x: triangleSpec.x, y: triangleSpec.y },
    dimensions: { width: triangleSpec.width, height: triangleSpec.height },
    boundaryVertices: triangleSpec.boundaryVerticles,
    currentAnimation: triangleSpec.currentAnimation,
    _id: triangleSpec._id,
    Triangle: {
      verticles: triangleSpec.verticles,
      x: triangleSpec.x,
      y: triangleSpec.y,
      width: triangleSpec.width,
      height: triangleSpec.height,
      fillColor: triangleSpec.fillColor,
      borderColor: triangleSpec.borderColor,
    },
  };
  const updateTriangleSpec = useMutation(
    async () => {
      const objectId = triangleSpec._id;
      const response = await axiosInstance.put(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects/${objectId}`,
        updatedTriangleSpec,
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
      const initialSpec = { ...triangleSpec };

      const moveHandler = throttle((moveEvent) => {
        const newPosition = {
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        };

        let newTriangleSpec = { ...triangleSpec };
        const heightChange = newPosition.y - initialPosition.y;
        const widthChange = newPosition.x - initialPosition.x;

        switch (draggedVertexIndex) {
          case 0:
            newTriangleSpec = {
              ...newTriangleSpec,
              width: Math.max(10, initialSpec.width - widthChange),
              height: Math.max(10, initialSpec.height - heightChange),
              x: initialSpec.x + widthChange,
              y: initialSpec.y + heightChange,
            };
            break;
          case 2:
            newTriangleSpec = {
              ...newTriangleSpec,
              width: Math.max(10, initialSpec.width + widthChange),
              height: Math.max(10, initialSpec.height - heightChange),
              y: initialSpec.y + heightChange,
            };
            break;
          case 4:
            newTriangleSpec = {
              ...newTriangleSpec,
              width: Math.max(10, initialSpec.width + widthChange),
              height: Math.max(10, initialSpec.height + heightChange),
            };
            break;
          case 6:
            newTriangleSpec = {
              ...newTriangleSpec,
              width: Math.max(10, initialSpec.width - widthChange),
              height: Math.max(10, initialSpec.height + heightChange),
              x: initialSpec.x + widthChange,
            };
            break;
          case 1:
            newTriangleSpec = {
              ...newTriangleSpec,
              height: Math.max(10, initialSpec.height - heightChange),
              y: initialSpec.y + heightChange,
            };
            break;
          case 5:
            newTriangleSpec = {
              ...newTriangleSpec,
              height: Math.max(10, initialSpec.height + heightChange),
            };
            break;
          case 3:
            newTriangleSpec = {
              ...newTriangleSpec,
              width: Math.max(10, initialSpec.width + widthChange),
            };
            break;
          case 7:
            newTriangleSpec = {
              ...newTriangleSpec,
              width: Math.max(10, initialSpec.width - widthChange),
              x: initialSpec.x + widthChange,
            };
            break;
          default:
            break;
        }

        setTriangleSpec(newTriangleSpec);
      }, 200);

      const upHandler = async () => {
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", upHandler);
        await updateTriangleSpec.mutateAsync();
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
    [triangleSpec, updateTriangleSpec],
  );

  function onTriangleDrag(event) {
    event.stopPropagation();

    const initialPosition = {
      x: event.clientX - triangleSpec.x,
      y: event.clientY - triangleSpec.y,
    };

    const moveHandler = throttle((moveEvent) => {
      setTriangleSpec((prevSpec) => ({
        ...prevSpec,
        x: moveEvent.clientX - initialPosition.x,
        y: moveEvent.clientY - initialPosition.y,
      }));
    }, 150);

    const upHandler = async () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);

      await updateTriangleSpec.mutateAsync();
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  }

  useEffect(() => {
    setTriangleSpec(spec);
  }, [spec]);

  useEffect(() => {
    const offset = { x: 1, y: 1 };

    const baseVertices = [
      { x: triangleSpec.x, y: triangleSpec.y },
      { x: triangleSpec.x + triangleSpec.width / 2, y: triangleSpec.y },
      { x: triangleSpec.x + triangleSpec.width, y: triangleSpec.y },
      {
        x: triangleSpec.x + triangleSpec.width,
        y: triangleSpec.y + triangleSpec.height / 2,
      },
      {
        x: triangleSpec.x + triangleSpec.width,
        y: triangleSpec.y + triangleSpec.height,
      },
      {
        x: triangleSpec.x + triangleSpec.width / 2,
        y: triangleSpec.y + triangleSpec.height,
      },
      { x: triangleSpec.x, y: triangleSpec.y + triangleSpec.height },
      { x: triangleSpec.x, y: triangleSpec.y + triangleSpec.height / 2 },
    ];

    const updatedBoundaryVertices = baseVertices.map((vertex) => ({
      x: vertex.x + offset.x,
      y: vertex.y + offset.y,
    }));

    setBoundaryVertices(updatedBoundaryVertices);
  }, [triangleSpec]);

  return (
    <div
      onClick={handleTriangleClick}
      onMouseDown={onTriangleDrag}
      onContextMenu={onContextMenu}
      aria-hidden="true"
    >
      <StyledTriangle spec={triangleSpec} />
      {isSelected && (
        <Boundary
          boundaryVertices={boundaryVertices}
          onVertexDrag={onVertexDrag}
        />
      )}
    </div>
  );
}

const StyledTriangle = styled.div`
  position: absolute;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background-color: ${({ spec }) => spec.fillColor};
  border: 1px solid ${({ spec }) => spec.borderColor};
  top: ${({ spec }) => spec.y}px;
  left: ${({ spec }) => spec.x}px;
`;

export default Triangle;
