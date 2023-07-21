import { styled } from "styled-components";

function SlideCanvas({ canvasSpec, objSpec }) {
  return (
    <Canvas spec={canvasSpec}>
      <Rectangle spec={objSpec} />
      <Rectangle spec={objSpec} />
      <Rectangle spec={objSpec} />
    </Canvas>
  );
}

const Canvas = styled.div`
  position: relative;
  width: ${({ spec }) => spec.w / spec.scaleX}px;
  height: ${({ spec }) => spec.h / spec.scaleY}px;
  transform: scaleX(${({ spec }) => spec.scaleX}) scaleY(${({ spec }) => spec.scaleY});
  overflow: hidden;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  `;
const Rectangle = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x / spec.scaleX}px;
  top: ${({ spec }) => spec.y / spec.scaleY}px;
  width: ${({ spec }) => spec.w / spec.scaleX}px;
  height: ${({ spec }) => spec.h / spec.scaleY}px;
  transform: scaleX(${({ spec }) => spec.scaleX}) scaleY(${({ spec }) => spec.scaleY});
  background-color: #222;
`;

export default SlideCanvas;
