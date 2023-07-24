import { styled } from "styled-components";

function Object({ type, objectSpec }) {
  switch (type) {
    case "Textbox":
      return <Textbox />;
    case "Rectangle":
      return <Rectangle />;
    case "Triangle":
      return <Triangle />;
    case "Circle":
      return <Circle />;
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
`;
const Rectangle = styled.div`
  position: absolute;
  left: ${(objectSpec) => objectSpec.x};
  top: ${(objectSpec) => objectSpec.y};
  width: ${(objectSpec) => objectSpec.width};
  height: ${(objectSpec) => objectSpec.height};
`;
const Triangle = styled.div`
  position: absolute;
  left: ${(objectSpec) => objectSpec.x};
  top: ${(objectSpec) => objectSpec.y};
  width: ${(objectSpec) => objectSpec.width};
  height: ${(objectSpec) => objectSpec.height};
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid green;

  margin: 2rem;
`;
const Circle = styled.div`
  position: absolute;
  left: ${(objectSpec) => objectSpec.x};
  top: ${(objectSpec) => objectSpec.y};
  width: ${(objectSpec) => objectSpec.width};
  height: ${(objectSpec) => objectSpec.height};
  border-radius: 100%;
`;

export default Object;
