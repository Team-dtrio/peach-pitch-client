import { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import Boundary from "../Boundary";
import { ObjectContext } from "../../../../../contexts/ObjectContext";

const StyledTextBox = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  text-align: ${({ spec }) => spec.textAlign};
  border: 1px solid ${({ spec }) => spec.borderColor};
  background-color: ${({ spec }) => spec.innerColor};
  user-select: none;
`;

const EditableDiv = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  overflow: auto;
  outline: none;
  color: ${({ spec }) => spec.textColor};
  font-size: ${({ spec }) => spec.fontSize}px;
  font-family: ${({ spec }) => spec.fontFamily};
  font-style: ${({ spec }) => spec.fontStyle};
  font-weight: 400;
  text-decoration: ${({ spec }) => spec.fontStyle};
`;

function EditableTextBox({ spec }) {
  return (
    <StyledTextBox spec={spec}>
      <EditableDiv spec={spec} contentEditable>
        {spec.content}
      </EditableDiv>
    </StyledTextBox>
  );
}

function Textbox({ id, spec }) {
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [textBoxSpec, setTextBoxSpec] = useState(spec);

  const { selectedObjectId, selectedObjectType, selectObject } =
    useContext(ObjectContext);

  const isSelected =
    id === selectedObjectId && spec.type === selectedObjectType;

  const handleTextBoxClick = (event) => {
    event.stopPropagation();
    selectObject(id, spec.type);
  };

  const onVertexDrag = useCallback(
    (draggedVertexIndex) => (event) => {
      event.preventDefault();
      event.stopPropagation();

      const initialPosition = { x: event.clientX, y: event.clientY };
      const initialSpec = { ...textBoxSpec };

      function moveHandler(moveEvent) {
        const newPosition = {
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        };

        let newTextBoxSpec = { ...textBoxSpec };
        const heightChange = newPosition.y - initialPosition.y;
        const widthChange = newPosition.x - initialPosition.x;

        switch (draggedVertexIndex) {
          case 0:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: initialSpec.width - widthChange,
              height: initialSpec.height - heightChange,
              x: newPosition.x,
              y: newPosition.y,
            };
            break;
          case 2:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height - heightChange,
              y: newPosition.y,
            };
            break;
          case 4:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height + heightChange,
            };
            break;
          case 6:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: initialSpec.width - widthChange,
              height: initialSpec.height + heightChange,
              x: newPosition.x,
            };
            break;
          case 1:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              height: Math.max(10, initialSpec.height - heightChange),
              y: newPosition.y,
            };
            break;
          case 5:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              height: Math.max(10, initialSpec.height + heightChange),
            };
            break;
          case 3:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: Math.max(10, initialSpec.width + widthChange),
            };
            break;
          case 7:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: Math.max(10, initialSpec.width - widthChange),
              x: newPosition.x,
            };
            break;
          default:
            break;
        }

        setTextBoxSpec(newTextBoxSpec);
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
    [textBoxSpec],
  );

  function onTextBoxDrag(event) {
    event.stopPropagation();

    const initialPosition = {
      x: event.clientX - textBoxSpec.x,
      y: event.clientY - textBoxSpec.y,
    };

    function moveHandler(moveEvent) {
      setTextBoxSpec((prevSpec) => ({
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
      { x: textBoxSpec.x, y: textBoxSpec.y },
      { x: textBoxSpec.x + textBoxSpec.width / 2, y: textBoxSpec.y },
      { x: textBoxSpec.x + textBoxSpec.width, y: textBoxSpec.y },
      {
        x: textBoxSpec.x + textBoxSpec.width,
        y: textBoxSpec.y + textBoxSpec.height / 2,
      },
      {
        x: textBoxSpec.x + textBoxSpec.width,
        y: textBoxSpec.y + textBoxSpec.height,
      },
      {
        x: textBoxSpec.x + textBoxSpec.width / 2,
        y: textBoxSpec.y + textBoxSpec.height,
      },
      { x: textBoxSpec.x, y: textBoxSpec.y + textBoxSpec.height },
      { x: textBoxSpec.x, y: textBoxSpec.y + textBoxSpec.height / 2 },
    ];

    const updatedBoundaryVertices = baseVertices.map((vertex) => ({
      x: vertex.x + offset.x,
      y: vertex.y + offset.y,
    }));

    setBoundaryVertices(updatedBoundaryVertices);
  }, [textBoxSpec]);

  return (
    <div
      onClick={handleTextBoxClick}
      onMouseDown={onTextBoxDrag}
      aria-hidden="true"
    >
      <EditableTextBox spec={textBoxSpec} />
      {isSelected && (
        <Boundary
          boundaryVertices={boundaryVertices}
          onVertexDrag={onVertexDrag}
        />
      )}
    </div>
  );
}

export default Textbox;
