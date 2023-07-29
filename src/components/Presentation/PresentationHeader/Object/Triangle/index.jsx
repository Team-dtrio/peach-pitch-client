import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Boundary from "../Boundary";

const StyledTriangle = styled.div`
  position: absolute;
  width: ${(props) => props.spec.width}px;
  height: ${(props) => props.spec.height}px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background: ${(props) => props.spec.fillColor};
  top: ${(props) => props.spec.y}px;
  left: ${(props) => props.spec.x}px;
  cursor: move;
`;

const initialTriangleSpec = {
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  fillColor: "#000000",
  borderColor: "#000000",
};

function Triangle() {
  const [isSelected, setIsSelected] = useState(false);
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [triangleSpec, setTriangleSpec] = useState(initialTriangleSpec);

  const handleTriangleClick = () => {
    setIsSelected(!isSelected);
  };

  const onVertexDrag = useCallback(
    (draggedVertexIndex) => (e) => {
      e.preventDefault();
      e.stopPropagation();

      const initialPosition = { x: e.clientX, y: e.clientY };
      const initialSpec = { ...triangleSpec };

      const moveHandler = (moveEvent) => {
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
              width: initialSpec.width - widthChange,
              height: initialSpec.height - heightChange,
              x: newPosition.x,
              y: newPosition.y,
            };
            break;
          case 2:
            newTriangleSpec = {
              ...newTriangleSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height - heightChange,
              y: newPosition.y,
            };
            break;
          case 4:
            newTriangleSpec = {
              ...newTriangleSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height + heightChange,
            };
            break;
          case 6:
            newTriangleSpec = {
              ...newTriangleSpec,
              width: initialSpec.width - widthChange,
              height: initialSpec.height + heightChange,
              x: newPosition.x,
            };
            break;
          case 1:
            newTriangleSpec = {
              ...newTriangleSpec,
              height: Math.max(10, initialSpec.height - heightChange),
              y: newPosition.y,
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
              x: newPosition.x,
            };
            break;
          default:
            break;
        }

        setTriangleSpec(newTriangleSpec);
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
    [triangleSpec],
  );

  const onTriangleDrag = (e) => {
    e.stopPropagation();

    const initialPosition = {
      x: e.clientX - triangleSpec.x,
      y: e.clientY - triangleSpec.y,
    };

    const moveHandler = (moveEvent) => {
      setTriangleSpec((prevSpec) => ({
        ...prevSpec,
        x: moveEvent.clientX - initialPosition.x,
        y: moveEvent.clientY - initialPosition.y,
      }));
    };

    const upHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  };

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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleTriangleClick} onMouseDown={onTriangleDrag}>
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

export default Triangle;
