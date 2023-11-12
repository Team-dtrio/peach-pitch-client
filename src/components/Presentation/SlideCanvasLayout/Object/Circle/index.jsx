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

function Circle({ id, spec, onContextMenu }) {
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [circleSpec, setCircleSpec] = useState(spec);
  const user = getUser();
  const userId = user._id;
  const { presentationId, slideId } = useParams();
  const queryClient = useQueryClient();

  const { selectedObjectId, selectedObjectType, selectObject } =
    useContext(ObjectContext);

  const isSelected =
    id === selectedObjectId && spec.type === selectedObjectType;

  const handleCircleClick = (event) => {
    event.stopPropagation();
    selectObject(id, spec.type);
  };

  const updatedCircleSpec = {
    type: circleSpec.type,
    coordinates: { x: circleSpec.x, y: circleSpec.y },
    dimensions: { width: circleSpec.width, height: circleSpec.height },
    boundaryVertices: circleSpec.boundaryVertices,
    currentAnimation: circleSpec.currentAnimation,
    _id: circleSpec._id,
    Circle: {
      radius: circleSpec.radius,
      fillColor: circleSpec.fillColor,
      borderColor: circleSpec.borderColor,
    },
  };

  const updateCircleSpec = useMutation(
    async () => {
      const objectId = circleSpec._id;
      const response = await axiosInstance.put(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects/${objectId}`,
        updatedCircleSpec,
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
      const initialSpec = { ...circleSpec };

      const moveHandler = throttle((moveEvent) => {
        const newPosition = {
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        };

        let newCircleSpec = { ...circleSpec };
        const heightChange = newPosition.y - initialPosition.y;
        const widthChange = newPosition.x - initialPosition.x;

        switch (draggedVertexIndex) {
          case 0:
            newCircleSpec = {
              ...newCircleSpec,
              width: initialSpec.width - widthChange,
              height: initialSpec.height - heightChange,
              x: initialSpec.x + widthChange,
              y: initialSpec.y + heightChange,
            };
            break;
          case 1:
            newCircleSpec = {
              ...newCircleSpec,
              width: initialSpec.width,
              height: initialSpec.height - heightChange,
              y: initialSpec.y + heightChange,
            };
            break;
          case 2:
            newCircleSpec = {
              ...newCircleSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height - heightChange,
              x: initialSpec.x,
              y: initialSpec.y + heightChange,
            };
            break;
          case 3:
            newCircleSpec = {
              ...newCircleSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height,
              x: initialSpec.x,
            };
            break;
          case 4:
            newCircleSpec = {
              ...newCircleSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height + heightChange,
              x: initialSpec.x,
              y: initialSpec.y,
            };
            break;
          case 5:
            newCircleSpec = {
              ...newCircleSpec,
              width: initialSpec.width,
              height: initialSpec.height + heightChange,
              y: initialSpec.y,
            };
            break;
          case 6:
            newCircleSpec = {
              ...newCircleSpec,
              width: initialSpec.width - widthChange,
              height: initialSpec.height + heightChange,
              x: initialSpec.x + widthChange,
            };
            break;
          case 7:
            newCircleSpec = {
              ...newCircleSpec,
              width: initialSpec.width - widthChange,
              height: initialSpec.height,
              x: initialSpec.x + widthChange,
            };
            break;
          default:
            break;
        }

        setCircleSpec(newCircleSpec);
      }, 200);

      const upHandler = async () => {
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", upHandler);

        await updateCircleSpec.mutateAsync();
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
    [circleSpec, updateCircleSpec],
  );

  const onCircleDrag = (event) => {
    event.stopPropagation();

    const initialPosition = {
      x: event.clientX - circleSpec.x,
      y: event.clientY - circleSpec.y,
    };

    const moveHandler = throttle((moveEvent) => {
      setCircleSpec((prevSpec) => ({
        ...prevSpec,
        x: moveEvent.clientX - initialPosition.x,
        y: moveEvent.clientY - initialPosition.y,
      }));
    }, 150);

    const upHandler = async () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);

      await updateCircleSpec.mutateAsync();
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler, { once: true });
  };

  useEffect(() => {
    setCircleSpec(spec);
  }, [spec]);

  useEffect(() => {
    const offset = { x: 1, y: 1 };

    const baseVertices = [
      { x: circleSpec.x, y: circleSpec.y },
      { x: circleSpec.x + circleSpec.width / 2, y: circleSpec.y },
      { x: circleSpec.x + circleSpec.width, y: circleSpec.y },
      {
        x: circleSpec.x + circleSpec.width,
        y: circleSpec.y + circleSpec.height / 2,
      },
      {
        x: circleSpec.x + circleSpec.width,
        y: circleSpec.y + circleSpec.height,
      },
      {
        x: circleSpec.x + circleSpec.width / 2,
        y: circleSpec.y + circleSpec.height,
      },
      { x: circleSpec.x, y: circleSpec.y + circleSpec.height },
      { x: circleSpec.x, y: circleSpec.y + circleSpec.height / 2 },
    ];

    const updatedBoundaryVertices = baseVertices.map((vertex) => ({
      x: vertex.x + offset.x,
      y: vertex.y + offset.y,
    }));

    setBoundaryVertices(updatedBoundaryVertices);
  }, [circleSpec]);

  return (
    <div
      onClick={handleCircleClick}
      onMouseDown={onCircleDrag}
      onContextMenu={onContextMenu}
      aria-hidden="true"
    >
      <StyledCircle spec={circleSpec} />
      {isSelected && (
        <Boundary
          boundaryVertices={boundaryVertices}
          onVertexDrag={onVertexDrag}
        />
      )}
    </div>
  );
}

const StyledCircle = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  background-color: ${({ spec }) => spec.fillColor};
  border: 1px solid ${({ spec }) => spec.borderColor};
  border-radius: 100%;
`;

export default Circle;
