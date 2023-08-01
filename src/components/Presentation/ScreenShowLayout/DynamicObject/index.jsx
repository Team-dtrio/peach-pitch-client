import styled, { css } from "styled-components";
import animations from "../../../../styles/animations";

const BaseComponent = styled.div`
  position: absolute;
  left: ${({ spec }) => (spec.x / 800) * 100}%;
  top: ${({ spec }) => (spec.y / 500) * 100}%;
  width: ${({ spec }) => (spec.width / 800) * 100}%;
  height: ${({ spec }) => (spec.height / 500) * 100}%;
  background-color: ${({ spec }) => spec.fillColor};
  border: 1px solid ${({ spec }) => spec.borderColor};
  text-align: ${({ spec }) => spec.textAlign};
  animation: ${({ spec }) => animations[spec.currentAnimation]} 2s linear;
  user-select: none;
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
const TextBox = styled(BaseComponent)`
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
const Image = styled(BaseComponent).attrs({ as: "img" })`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Square = styled(BaseComponent)``;
const Triangle = styled(BaseComponent)`
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`;
const Circle = styled(BaseComponent)`
  border-radius: 100%;
`;

function DynamicObject({ objectSpec, isAnimationActive }) {
  const components = {
    Image,
    Square,
    Triangle,
    Circle,
  };
  const Tag = components[objectSpec.type] || "div";

  if (objectSpec.type.toLowerCase() === "textbox") {
    return (
      <BaseComponent spec={objectSpec} isActive={isAnimationActive}>
        <TextBox spec={objectSpec} contentEditable>
          {objectSpec.content}
        </TextBox>
      </BaseComponent>
    );
  }

  return <Tag spec={objectSpec} isActive={isAnimationActive} />;
}

export default DynamicObject;
