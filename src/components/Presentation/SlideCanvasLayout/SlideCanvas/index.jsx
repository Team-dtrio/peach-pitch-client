import { styled } from "styled-components";
import Object from "../../../Object";

function SlideCanvas({ canvasSpec, objects }) {
  return (
    <Canvas spec={canvasSpec}>
      {objects &&
        objects.map((object) => {
          const objectSpec = {
            x: object.coordinates.x,
            y: object.coordinates.y,
            width: object.dimensions.width,
            height: object.dimensions.height,
          };

          return (
            <Object
              key={object._id}
              type={object.type}
              objectSpec={objectSpec}
            />
          );
        })}
    </Canvas>
  );
}

const Canvas = styled.div`
  position: relative;
  width: ${({ spec }) => spec.w / spec.scaleX}px;
  height: ${({ spec }) => spec.h / spec.scaleY}px;
  transform: scaleX(${({ spec }) => spec.scaleX})
    scaleY(${({ spec }) => spec.scaleY});
  overflow: hidden;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default SlideCanvas;
