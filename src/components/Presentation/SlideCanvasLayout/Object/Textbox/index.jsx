import { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import Boundary from "../Boundary";
import { ObjectContext } from "../../../../../Contexts/Objectcontext";

const StyledTextBox = styled.div`
  position: absolute;
  left: ${(props) => props.spec.x}px;
  top: ${(props) => props.spec.y}px;
  width: ${(props) => props.spec.width}px;
  height: ${(props) => props.spec.height}px;
  border: 1px solid ${(props) => props.spec.borderColor};
  background-color: ${(props) => props.spec.innerColor};
  user-select: none;
`;

const EditableDiv = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  overflow: auto;
  outline: none;
  color: ${(props) => props.spec.textColor};
  text-align: ${(props) => props.spec.textAlign};
  font-size: ${(props) => props.spec.fontSize}px;
  font-family: ${(props) => props.spec.fontFamily};
  font-style: ${(props) =>
    props.spec.fontStyle.includes("italic") ? "italic" : "normal"};
  font-weight: ${(props) =>
    props.spec.fontStyle.includes("bold") ? "bold" : "normal"};
  text-decoration: ${(props) =>
    props.spec.fontStyle.includes("underline") ? "underline" : "none"};
  text-decoration: ${(props) =>
    props.spec.fontStyle.includes("strikeThrough") ? "line-through" : "none"};
`;

function EditableTextBox({ spec }) {
  return (
    <StyledTextBox spec={spec}>
      <EditableDiv spec={spec} contentEditable>
        {spec.text}
      </EditableDiv>
    </StyledTextBox>
  );
}

const initialTextBoxSpec = {
  x: 100,
  y: 100,
  width: 200,
  height: 100,
  borderColor: "#000000",
  innerColor: "#FFFFFF",
  content: "New Textbox",
  fontSize: 14,
  fontFamily: "Arial",
  textAlign: "left",
  textColor: "#000000",
  fontStyle: "normal",
};

function Textbox({ id, type }) {
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [textBoxSpec, setTextBoxSpec] = useState(initialTextBoxSpec);

  const { selectedObjectId, selectedObjectType, selectObject } =
    useContext(ObjectContext);

  const isSelected = id === selectedObjectId && type === selectedObjectType;

  const handleTextBoxClick = (event) => {
    event.stopPropagation();
    selectObject(id, type);
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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleTextBoxClick} onMouseDown={onTextBoxDrag}>
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
