import { useState, useEffect, useCallback, useContext } from "react";
import styled, { css } from "styled-components";
import Boundary from "../Boundary";
import { ObjectContext } from "../../../contexts/ObjectContext";
import animations from "../../../styles/animations";

const StyledCircle = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  background-color: ${({ spec }) => spec.fillColor};
  border: 1px solid ${({ spec }) => spec.borderColor};
  border-radius: 100%;
  animation: ${({ spec }) => animations[spec.currentAnimation]} 2s linear;
  ${({ isActive }) =>
    isActive === undefined &&
    css`
      animation-duration: 0s;
    `}
  ${({ isActive }) =>
    isActive
      ? css`
          animation-play-state: running;
        `
      : css`
          animation-play-state: paused;
        `};
`;

function Circle({ id, spec, isActive }) {
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [circleSpec, setCircleSpec] = useState(spec);

  const { selectedObjectId, selectedObjectType, selectObject } =
    useContext(ObjectContext);

  const isSelected =
    id === selectedObjectId && spec.type === selectedObjectType;

  const handleCircleClick = (event) => {
    event.stopPropagation();
    selectObject(id, spec.type, spec);
  };

  const onVertexDrag = useCallback(
    (draggedVertexIndex) => (event) => {
      event.preventDefault();
      event.stopPropagation();

      const initialPosition = { x: event.clientX, y: event.clientY };
      const initialSpec = { ...circleSpec };

      const moveHandler = (moveEvent) => {
        const newPosition = {
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        };

        let newCircleSpec = { ...circleSpec };
        const heightChange = newPosition.y - initialPosition.y;
        const widthChange = newPosition.x - initialPosition.x;

        switch (draggedVertexIndex) {
          case 0:
          case 4:
            newCircleSpec = {
              ...newCircleSpec,
              width: initialSpec.width + 2 * widthChange,
            };
            break;
          case 2:
          case 6:
            newCircleSpec = {
              ...newCircleSpec,
              height: initialSpec.height + 2 * heightChange,
            };
            break;
          case 1:
          case 5:
            newCircleSpec = {
              ...newCircleSpec,
              height: initialSpec.height - 2 * heightChange,
            };
            break;
          case 3:
          case 7:
            newCircleSpec = {
              ...newCircleSpec,
              width: initialSpec.width - 2 * widthChange,
            };
            break;
          default:
            break;
        }

        setCircleSpec(newCircleSpec);
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
    [circleSpec],
  );

  const onCircleDrag = (event) => {
    event.stopPropagation();

    const initialPosition = {
      x: event.clientX - circleSpec.x,
      y: event.clientY - circleSpec.y,
    };

    function moveHandler(moveEvent) {
      setCircleSpec((prevSpec) => ({
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
      { x: circleSpec.x, y: circleSpec.y + circleSpec.width },
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
      aria-hidden="true"
    >
      <StyledCircle spec={circleSpec} isActive={isActive} />
      {isSelected && (
        <Boundary
          boundaryVertices={boundaryVertices}
          onVertexDrag={onVertexDrag}
        />
      )}
    </div>
  );
}

export default Circle;
