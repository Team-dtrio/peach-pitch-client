import { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import Boundary from "../Boundary";
import { ObjectContext } from "../../../../../Contexts/Objectcontext";

const StyledCircle = styled.div`
  position: absolute;
  left: ${(props) => props.spec.x}px;
  top: ${(props) => props.spec.y}px;
  width: ${(props) => props.spec.size}px;
  height: ${(props) => props.spec.size}px;
  background-color: ${(props) => props.spec.fillColor};
  border: 1px solid ${(props) => props.spec.borderColor};
  border-radius: 50%;
`;

const initialCircleSpec = {
  x: 150,
  y: 150,
  size: 100,
  fillColor: "#000000",
  borderColor: "#000000",
};

function Circle({ id, type }) {
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [circleSpec, setCircleSpec] = useState(initialCircleSpec);

  const { selectedObjectId, selectedObjectType, selectObject } =
    useContext(ObjectContext);

  const isSelected = id === selectedObjectId && type === selectedObjectType;

  const handleCircleClick = (event) => {
    event.stopPropagation();
    selectObject(id, type);
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
              size: initialSpec.size + 2 * widthChange,
            };
            break;
          case 2:
          case 6:
            newCircleSpec = {
              ...newCircleSpec,
              size: initialSpec.size + 2 * heightChange,
            };
            break;
          case 1:
          case 5:
            newCircleSpec = {
              ...newCircleSpec,
              size: initialSpec.size - 2 * heightChange,
            };
            break;
          case 3:
          case 7:
            newCircleSpec = {
              ...newCircleSpec,
              size: initialSpec.size - 2 * widthChange,
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
      { x: circleSpec.x + circleSpec.size / 2, y: circleSpec.y },
      { x: circleSpec.x + circleSpec.size, y: circleSpec.y },
      {
        x: circleSpec.x + circleSpec.size,
        y: circleSpec.y + circleSpec.size / 2,
      },
      {
        x: circleSpec.x + circleSpec.size,
        y: circleSpec.y + circleSpec.size,
      },
      {
        x: circleSpec.x + circleSpec.size / 2,
        y: circleSpec.y + circleSpec.size,
      },
      { x: circleSpec.x, y: circleSpec.y + circleSpec.size },
      { x: circleSpec.x, y: circleSpec.y + circleSpec.size / 2 },
    ];

    const updatedBoundaryVertices = baseVertices.map((vertex) => ({
      x: vertex.x + offset.x,
      y: vertex.y + offset.y,
    }));

    setBoundaryVertices(updatedBoundaryVertices);
  }, [circleSpec]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleCircleClick} onMouseDown={onCircleDrag}>
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

export default Circle;
