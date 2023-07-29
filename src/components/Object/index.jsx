import { styled } from "styled-components";

const BaseComponent = styled.div`
  position: absolute;
  cursor: pointer;
  left: ${({ spec, pointedObject }) =>
    spec?._id === pointedObject?._id ? pointedObject.x : spec.x}px;
  top: ${({ spec, pointedObject }) =>
    spec?._id === pointedObject?._id ? pointedObject.y : spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  background-color: ${({ spec }) => spec.color || "#222"};
`;
const TextBox = styled(BaseComponent).attrs({ as: "input" })``;
const Image = styled(BaseComponent).attrs({ as: "img" })``;
const Square = styled(BaseComponent)``;
const Triangle = styled(BaseComponent)`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid green;
`;
const Circle = styled(BaseComponent)`
  border-radius: 100%;
`;

function Object({ spec, pointedObject, onObjectClick, onObjectMouseDown }) {
  const components = {
    TextBox,
    Image,
    Square,
    Triangle,
    Circle,
  };
  const Tag = components[spec.type] || "div";

  return (
    <Tag
      spec={spec}
      pointedObject={pointedObject}
      onClick={() => onObjectClick(spec)}
      onMouseDown={onObjectMouseDown}
    />
  );
}

export default Object;
