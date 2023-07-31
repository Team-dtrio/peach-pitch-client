import Circle from "./Circle";
import Triangle from "./Triangle";
import Textbox from "./Textbox";
import Square from "./Square";
import Image from "./Image";

function Object({ objectSpec, id }) {
  switch (objectSpec?.type.toLowerCase()) {
    case "circle":
      return <Circle spec={objectSpec} id={id} />;
    case "triangle":
      return <Triangle spec={objectSpec} id={id} />;
    case "textbox":
      return <Textbox spec={objectSpec} id={id} />;
    case "square":
      return <Square spec={objectSpec} id={id} />;
    case "image":
      return <Image spec={objectSpec} id={id} />;
    default:
      return null;
  }
}

export default Object;
