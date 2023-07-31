import { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import Boundary from "../Boundary";
import { ObjectContext } from "../../../../../contexts/ObjectContext";

const StyledSquare = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  background-color: ${({ spec }) => spec.fillColor};
  border: 1px solid ${({ spec }) => spec.borderColor};
`;

function Square({ id, spec }) {
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [squareSpec, setSquareSpec] = useState(spec);

  const { selectedObjectId, selectedObjectType, selectObject } =
    useContext(ObjectContext);

  const isSelected =
    id === selectedObjectId && spec.type === selectedObjectType;

  const handleSquareClick = (event) => {
    event.stopPropagation();
    selectObject(id, spec.type);
  };

  const onVertexDrag = useCallback(
    (draggedVertexIndex) => (event) => {
      event.preventDefault();
      event.stopPropagation();

      const initialPosition = { x: event.clientX, y: event.clientY };
      const initialSpec = { ...squareSpec };

      function moveHandler(moveEvent) {
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
              x: newPosition.x,
              y: newPosition.y,
            };
            break;
          case 2:
            newSquareSpec = {
              ...newSquareSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height - heightChange,
              y: newPosition.y,
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
              x: newPosition.x,
            };
            break;
          case 1:
            newSquareSpec = {
              ...newSquareSpec,
              height: Math.max(10, initialSpec.height - heightChange),
              y: newPosition.y,
            };
            break;
          case 5:
            newSquareSpec = {
              ...newSquareSpec,
              height: Math.max(10, initialSpec.height + heightChange),
            };
            break;
          case 3:
            newSquareSpec = {
              ...newSquareSpec,
              width: Math.max(10, initialSpec.width + widthChange),
            };
            break;
          case 7:
            newSquareSpec = {
              ...newSquareSpec,
              width: Math.max(10, initialSpec.width - widthChange),
              x: newPosition.x,
            };
            break;
          default:
            break;
        }

        setSquareSpec(newSquareSpec);
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
    [squareSpec],
  );

  const onSquareDrag = (event) => {
    event.stopPropagation();

    const initialPosition = {
      x: event.clientX - squareSpec.x,
      y: event.clientY - squareSpec.y,
    };

    function moveHandler(moveEvent) {
      setSquareSpec((prevSpec) => ({
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
  };

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

export default Square;
