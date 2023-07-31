import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import DynamicObject from "../DynamicObject";

function ScreenShowCanvas({
  nonAnimatedObjects,
  animatedObjects,
  isSlideActive,
  activeAnimationIndex,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isSlideActive && canvasRef.current.requestFullscreen) {
      canvasRef.current.requestFullscreen();
    }
  }, [isSlideActive]);

  return (
    <Canvas ref={canvasRef}>
      {nonAnimatedObjects.map((object) => (
        <DynamicObject key={object._id} id={object._id} objectSpec={object} />
      ))}
      {animatedObjects.map((object, animationIndex) => (
        <DynamicObject
          key={object._id}
          id={object._id}
          objectSpec={object}
          isAnimationActive={animationIndex === activeAnimationIndex}
        />
      ))}
    </Canvas>
  );
}

const Canvas = styled.div`
  position: relative;
  width: 800px;
  height: 500px;
  background-color: #fff;
`;

export default ScreenShowCanvas;
