import ScreenShowCanvas from "./ScreenShowCanvas";

function ScreenShowLayout({ slides, activeSlideIndex, activeAnimationIndex }) {
  return (
    <>
      {slides.map((slide, slideIndex) => {
        const objects = slide.objects.map(
          (
            { _id, type, coordinates, dimensions, currentAnimation },
            objIndex,
            object,
          ) => {
            const features = object[objIndex][type];

            return {
              _id,
              type,
              x: coordinates.x,
              y: coordinates.y,
              width: dimensions.width,
              height: dimensions.height,
              currentAnimation,
              ...features,
            };
          },
        );
        const nonAnimatedObjects = objects.filter(
          (object) => !object.currentAnimation,
        );
        const animatedObjects = slide.animationSequence.map((element) =>
          objects.find((object) => object._id === element.objectId),
        );

        return (
          <ScreenShowCanvas
            key={slide._id}
            nonAnimatedObjects={nonAnimatedObjects}
            animatedObjects={animatedObjects}
            isSlideActive={slideIndex === activeSlideIndex}
            activeAnimationIndex={activeAnimationIndex}
          />
        );
      })}
    </>
  );
}

export default ScreenShowLayout;
