import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import DynamicObject from "../DynamicObject";

function ScreenShowCanvas({
  nonAnimatedObjects,
  animatedObjects,
  isSlideActive,
  activeAnimationIndex,
}) {
  const screenRef = useRef(null);

  useEffect(() => {
    if (isSlideActive && screenRef.current.requestFullscreen) {
      screenRef.current.requestFullscreen();
    }
  }, [isSlideActive]);

  return (
    <Screen ref={screenRef}>
      {isSlideActive &&
        nonAnimatedObjects.map((object) => (
          <DynamicObject key={object._id} objectSpec={object} />
        ))}
      {isSlideActive &&
        animatedObjects.map((object, animationIndex) => (
          <DynamicObject
            key={object._id}
            objectSpec={object}
            isAnimationActive={animationIndex === activeAnimationIndex}
          />
        ))}
    </Screen>
  );
}

const Screen = styled.div`
  position: relative;
  background-color: #fff;
`;

export default ScreenShowCanvas;
