import { styled } from "styled-components";

function Object({ spec, pointedObject, onObjectClick, onObjectMouseDown }) {
  switch (spec.type) {
    case "Textbox":
      return (
        <Textbox
          spec={spec}
          pointedObject={pointedObject}
          onClick={() => onObjectClick(spec)}
          onMouseDown={onObjectMouseDown}
        />
      );
    case "Square":
      return (
        <Square
          spec={spec}
          pointedObject={pointedObject}
          onClick={() => onObjectClick(spec)}
          onMouseDown={onObjectMouseDown}
        />
      );
    case "Triangle":
      return (
        <Triangle
          spec={spec}
          pointedObject={pointedObject}
          onClick={() => onObjectClick(spec)}
          onMouseDown={onObjectMouseDown}
        />
      );
    case "Circle":
      return (
        <Circle
          id="object"
          className="object"
          spec={spec}
          pointedObject={pointedObject}
          onClick={() => onObjectClick(spec)}
          onMouseDown={() => onObjectMouseDown(spec)}
        />
      );
    default:
      return <div />;
  }
}

const Textbox = styled.input`
  position: absolute;
  left: 50%;
  right: 50%;
  width: 100px;
  height: 100px;
  border: 1px dashed #222;
  cursor: pointer;
`;
const Square = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  background-color: #222;
  cursor: pointer;
`;
const Triangle = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  height: ${({ spec }) => spec.height}px;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid green;
  cursor: pointer;
`;
const Circle = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  border-radius: 100%;
  background-color: #222;
  cursor: pointer;
`;

export default Object;
