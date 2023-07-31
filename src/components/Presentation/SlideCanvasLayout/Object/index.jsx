import Circle from "./Circle";
import Triangle from "./Triangle";
import Textbox from "./Textbox";
import Square from "./Square";
import Image from "./Image";

function Object({ id, objectSpec, isAnimationActive }) {
  switch (objectSpec?.type.toLowerCase()) {
    case "circle":
      return <Circle spec={objectSpec} id={id} isActive={isAnimationActive} />;
    case "triangle":
      return (
        <Triangle spec={objectSpec} id={id} isActive={isAnimationActive} />
      );
    case "textbox":
      return <Textbox spec={objectSpec} id={id} isActive={isAnimationActive} />;
    case "square":
      return <Square spec={objectSpec} id={id} isActive={isAnimationActive} />;
    case "image":
      return <Image spec={objectSpec} id={id} isActive={isAnimationActive} />;
    default:
      return null;
  }
}

export default Object;
