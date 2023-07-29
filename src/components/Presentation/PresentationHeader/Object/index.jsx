import Circle from "./Circle";
import Triangle from "./Triangle";
import Textbox from "./Textbox";
import Square from "./Square";
import Image from "./Image";

function Object({ type, objectSpec }) {
  switch (type.toLowerCase()) {
    case "circle":
      return <Circle spec={objectSpec} />;
    case "triangle":
      return <Triangle spec={objectSpec} />;
    case "textbox":
      return <Textbox spec={objectSpec} />;
    case "square":
      return <Square spec={objectSpec} />;
    case "image":
      return <Image spec={objectSpec} />;
    default:
      return null;
  }
}

export default Object;
