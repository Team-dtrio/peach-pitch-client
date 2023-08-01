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
function Square({ id, spec, onContextMenu }) {
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [squareSpec, setSquareSpec] = useState(spec);
  const user = getUser();
  const userId = user._id;
  const { presentationId, slideId } = useParams();
  const queryClient = useQueryClient();
  const { selectedObjectId, selectedObjectType, selectObject } =
    useContext(ObjectContext);
  const isSelected =
    id === selectedObjectId && spec.type === selectedObjectType;
  const handleSquareClick = (event) => {
    event.stopPropagation();
    selectObject(id, spec.type);
  };
  const updatedSquareSpec = {
    type: squareSpec.type,
    coordinates: { x: squareSpec.x, y: squareSpec.y },
    dimensions: { width: squareSpec.width, height: squareSpec.height },
    boundaryVertices: squareSpec.boundaryVerticles,
    currentAnimation: squareSpec.currentAnimation,
    _id: squareSpec._id,
    Square: {
      fillColor: squareSpec.fillColor,
      borderColor: squareSpec.borderColor,
    },
  };
  const updateSquareSpec = useMutation(
    async () => {
      const objectId = squareSpec._id;
      const response = await axiosInstance.put(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects/${objectId}`,
        { spec: updatedSquareSpec },
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
      const initialSpec = { ...squareSpec };
      const moveHandler = throttle((moveEvent) => {
        const newPosition = {
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        };
        let newSquareSpec = { ...squareSpec };
        const heightChange = newPosition.y - initialPosition.y;
        const widthChange = newPosition.x - initialPosition.x;
        switch (draggedVertexIndex) {
          case 0:
            newSquareSpec = {
              ...newSquareSpec,
              width: initialSpec.width - widthChange,
              height: initialSpec.height - heightChange,
              x: initialSpec.x + widthChange,
              y: initialSpec.y + heightChange,
            };
            break;
          case 2:
            newSquareSpec = {
              ...newSquareSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height - heightChange,
              y: initialSpec.y + heightChange,
            };
            break;
          case 4:
            newSquareSpec = {
              ...newSquareSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height + heightChange,
            };
            break;
          case 6:
            newSquareSpec = {
              ...newSquareSpec,
              width: initialSpec.width - widthChange,
              height: initialSpec.height + heightChange,
              x: initialSpec.x + widthChange,
            };
            break;
          case 1:
            newSquareSpec = {
              ...newSquareSpec,
              height: initialSpec.height - heightChange,
              y: initialSpec.y + heightChange,
            };
            break;
          case 3:
            newSquareSpec = {
              ...newSquareSpec,
              width: initialSpec.width + widthChange,
            };
            break;
          case 5:
            newSquareSpec = {
              ...newSquareSpec,
              height: initialSpec.height + heightChange,
            };
            break;
          case 7:
            newSquareSpec = {
              ...newSquareSpec,
              width: initialSpec.width - widthChange,
              x: initialSpec.x + widthChange,
            };
            break;
          default:
            break;
        }
        setSquareSpec(newSquareSpec);
      }, 200);
      const upHandler = async () => {
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", upHandler);
        await updateSquareSpec.mutateAsync();
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
    [squareSpec, updateSquareSpec],
  );
  const onSquareDrag = (event) => {
    event.stopPropagation();
    const initialPosition = {
      x: event.clientX - squareSpec.x,
      y: event.clientY - squareSpec.y,
    };
    const moveHandler = throttle((moveEvent) => {
      setSquareSpec((prevSpec) => ({
        ...prevSpec,
        x: moveEvent.clientX - initialPosition.x,
        y: moveEvent.clientY - initialPosition.y,
      }));
    }, 150);
    const upHandler = async () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
      await updateSquareSpec.mutateAsync();
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler, { once: true });
  };
  useEffect(() => {
    setSquareSpec(spec);
  }, [spec]);
  useEffect(() => {
    const offset = { x: 1, y: 1 };
    const baseVertices = [
      { x: squareSpec.x, y: squareSpec.y },
      { x: squareSpec.x + squareSpec.width / 2, y: squareSpec.y },
      { x: squareSpec.x + squareSpec.width, y: squareSpec.y },
      {
        x: squareSpec.x + squareSpec.width,
        y: squareSpec.y + squareSpec.height / 2,
      },
      {
        x: squareSpec.x + squareSpec.width,
        y: squareSpec.y + squareSpec.height,
      },
      {
        x: squareSpec.x + squareSpec.width / 2,
        y: squareSpec.y + squareSpec.height,
      },
      { x: squareSpec.x, y: squareSpec.y + squareSpec.height },
      { x: squareSpec.x, y: squareSpec.y + squareSpec.height / 2 },
    ];
    const updatedBoundaryVertices = baseVertices.map((vertex) => ({
      x: vertex.x + offset.x,
      y: vertex.y + offset.y,
    }));
    setBoundaryVertices(updatedBoundaryVertices);
  }, [squareSpec]);
  return (
    <div
      onClick={handleSquareClick}
      onMouseDown={onSquareDrag}
      onContextMenu={onContextMenu}
      aria-hidden="true"
    >
      <StyledSquare spec={squareSpec} />
      {isSelected && (
        <Boundary
          boundaryVertices={boundaryVertices}
          onVertexDrag={onVertexDrag}
        />
      )}
    </div>
  );
}
const StyledSquare = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  background-color: ${({ spec }) => spec.fillColor};
  border: 1px solid ${({ spec }) => spec.borderColor};
`;
export default Square;
