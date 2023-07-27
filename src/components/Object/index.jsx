import { styled } from "styled-components";

function Textbox({ spec, pointedObject, onClick, onMouseDown }) {
  return (
    <StyledTextbox
      spec={spec}
      pointedObject={pointedObject}
      onClick={(event) => {
        event.stopPropagation();
        onClick(spec);
      }}
      onMouseDown={() => onMouseDown(spec)}
    />
  );
}

function Square({ spec, pointedObject, onClick, onMouseDown }) {
  return (
    <StyledSquare
      spec={spec}
      pointedObject={pointedObject}
      onClick={(event) => {
        event.stopPropagation();
        onClick(spec);
      }}
      onMouseDown={() => onMouseDown(spec)}
    />
  );
}

function Triangle({ spec, pointedObject, onClick, onMouseDown }) {
  return (
    <StyledTriangle
      spec={spec}
      pointedObject={pointedObject}
      onClick={(event) => {
        event.stopPropagation();
        onClick(spec);
      }}
      onMouseDown={() => onMouseDown(spec)}
    />
  );
}

function Circle({ spec, pointedObject, onClick, onMouseDown }) {
  return (
    <StyledCircle
      spec={spec}
      pointedObject={pointedObject}
      onClick={(event) => {
        event.stopPropagation();
        onClick(spec);
      }}
      onMouseDown={() => onMouseDown(spec)}
    />
  );
}

const StyledTextbox = styled.input`
  position: absolute;
  left: 50%;
  right: 50%;
  width: 100px;
  height: 100px;
  border: ${({ spec, pointedObject }) =>
    pointedObject && pointedObject._id === spec._id
      ? "2px solid red"
      : "1px dashed #222"};
  cursor: pointer;
`;

const StyledSquare = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  background-color: #222;
  cursor: pointer;
  border: ${({ spec, pointedObject }) =>
    pointedObject && pointedObject._id === spec._id ? "2px solid red" : "none"};
`;

const StyledTriangle = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  height: ${({ spec }) => spec.height}px;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: ${({ spec, pointedObject }) =>
    pointedObject && pointedObject._id === spec._id
      ? "50px solid red"
      : "50px solid green"};
  cursor: pointer;
`;

const StyledCircle = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  border-radius: 100%;
  background-color: ${({ spec, pointedObject }) =>
    pointedObject && pointedObject._id === spec._id ? "red" : "#222"};
  cursor: pointer;
`;

function getBorderStyle(spec, pointedObject) {
  return pointedObject && pointedObject._id === spec._id
    ? "2px solid red"
    : "1px dashed #222";
}

function Object({ spec, pointedObject, onObjectClick, onObjectMouseDown }) {
  const borderStyle = getBorderStyle(spec, pointedObject);
  switch (spec.type) {
    case "Textbox":
      return (
        <Textbox
          spec={spec}
          borderStyle={borderStyle}
          onClick={() => onObjectClick(spec)}
          onMouseDown={onObjectMouseDown}
        />
      );
    case "Square":
      return (
        <Square
          spec={spec}
          borderStyle={borderStyle}
          onClick={() => onObjectClick(spec)}
          onMouseDown={onObjectMouseDown}
        />
      );
    case "Triangle":
      return (
        <Triangle
          spec={spec}
          borderStyle={borderStyle}
          onClick={() => onObjectClick(spec)}
          onMouseDown={onObjectMouseDown}
        />
      );
    case "Circle":
      return (
        <Circle
          spec={spec}
          borderStyle={borderStyle}
          onClick={() => onObjectClick(spec)}
          onMouseDown={onObjectMouseDown}
        />
      );
    default:
      return <div />;
  }
}

export default Object;
