import Circle from "./Circle";
import Triangle from "./Triangle";
import Textbox from "./Textbox";
import Square from "./Square";
import Image from "./Image";

function Object({ objectSpec, id, onRightClick }) {
  function handleRightClick(event) {
    event.preventDefault();
    onRightClick(event, id);
  }

  switch (objectSpec?.type.toLowerCase()) {
    case "circle":
      return (
        <Circle spec={objectSpec} id={id} onContextMenu={handleRightClick} />
      );
    case "triangle":
      return (
        <Triangle spec={objectSpec} id={id} onContextMenu={handleRightClick} />
      );
    case "textbox":
      return (
        <Textbox spec={objectSpec} id={id} onContextMenu={handleRightClick} />
      );
    case "square":
      return (
        <Square spec={objectSpec} id={id} onContextMenu={handleRightClick} />
      );
    case "image":
      return (
        <Image spec={objectSpec} id={id} onContextMenu={handleRightClick} />
      );
    default:
      return null;
  }
}

export default Object;
