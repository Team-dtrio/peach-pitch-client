import { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import Boundary from "../Boundary";
import { ObjectContext } from "../../../contexts/ObjectContext";

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

function Triangle({ id, spec }) {
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [triangleSpec, setTriangleSpec] = useState(spec);

  const { selectedObjectId, selectedObjectType, selectObject } =
    useContext(ObjectContext);

  const isSelected =
    id === selectedObjectId && spec.type === selectedObjectType;

  const handleTriangleClick = (event) => {
    event.stopPropagation();
    selectObject(id, spec.type);
  };

  const onVertexDrag = useCallback(
    (draggedVertexIndex) => (event) => {
      event.preventDefault();
      event.stopPropagation();

      const initialPosition = { x: event.clientX, y: event.clientY };
      const initialSpec = { ...triangleSpec };

      function moveHandler(moveEvent) {
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
      }

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

  function onTriangleDrag(event) {
    event.stopPropagation();

    const initialPosition = {
      x: event.clientX - triangleSpec.x,
      y: event.clientY - triangleSpec.y,
    };

    function moveHandler(moveEvent) {
      setTriangleSpec((prevSpec) => ({
        ...prevSpec,
        x: moveEvent.clientX - initialPosition.x,
        y: moveEvent.clientY - initialPosition.y,
      }));
    }

    function upHandler() {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    }

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  }

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

export default Triangle;
