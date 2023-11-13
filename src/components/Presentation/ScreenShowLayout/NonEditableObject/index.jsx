import styled, { css } from "styled-components";
import animations from "../../../../styles/animations";

const BaseComponent = styled.div`
  position: absolute;
  left: ${({ spec }) => (spec.x / 900) * 100}%;
  top: ${({ spec }) => (spec.y / 600) * 100}%;
  width: ${({ spec }) => (spec.width / 900) * 100}%;
  height: ${({ spec }) => (spec.height / 600) * 100}%;
  background-color: ${({ spec }) =>
    spec.type.toLowerCase() === "textbox" ? "transparent" : spec.fillColor};
  border: 1px solid ${({ spec }) => spec.borderColor};
  text-align: ${({ spec }) => spec.textAlign};
  animation: ${({ spec }) => animations[spec.currentAnimation]} 2s linear;
  user-select: none;
  box-sizing: border-box;
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
  transform: translate(
    -${({ spec }) => (spec.x / 900) * 100}%,
    -${({ spec }) => (spec.y / 600) * 100}%
  );
  border: 0;
  outline: 0;
  overflow: hidden;
  color: ${({ spec }) => spec.textColor};
  background-color: ${({ spec }) => spec.fillColor};
  font-size: ${({ spec, isThumbnail }) =>
    isThumbnail ? spec.fontSize / 3 : spec.fontSize * 1.5}px;
  font-family: ${({ spec }) => spec.fontFamily};
  font-style: ${({ spec }) => spec.fontStyle};
  font-weight: ${({ spec }) => spec.fontWeight};
  text-decoration: ${({ spec }) => spec.textDecoration};
  line-height: 1.5;
`;
const Image = styled(BaseComponent).attrs({ as: "img" })`
  transform: translate(
    -${({ spec }) => (spec.x / 900) * 100}%,
    -${({ spec }) => (spec.y / 600) * 100}%
  );
  width: 100%;
  height: 100%;
`;
const Square = styled(BaseComponent)``;
const Triangle = styled(BaseComponent)`
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`;
const Circle = styled(BaseComponent)`
  border-radius: 100%;
`;

function NonEditableObject({ objectSpec, isAnimationActive, isThumbnail }) {
  const components = {
    Square,
    Triangle,
    Circle,
    Image,
  };
  const Tag = components[objectSpec.type] || "div";

  switch (objectSpec.type.toLowerCase()) {
    case "textbox":
      return (
        <BaseComponent spec={objectSpec} isActive={isAnimationActive}>
          <TextBox
            spec={objectSpec}
            isThumbnail={isThumbnail}
            contentEditable
            suppressContentEditableWarning
          >
            {objectSpec.content}
          </TextBox>
        </BaseComponent>
      );
    case "image":
      return (
        <BaseComponent spec={objectSpec} isActive={isAnimationActive}>
          <Image src={objectSpec.imageUrl} spec={objectSpec} alt="image" />
        </BaseComponent>
      );
    default:
      return <Tag spec={objectSpec} isActive={isAnimationActive} />;
  }
}

export default NonEditableObject;
