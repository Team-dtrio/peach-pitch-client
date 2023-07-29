import { useState } from "react";
import { styled } from "styled-components";
import shapeCreatorUrl from "../../../../../assets/oc-icon-shape.svg";
import ShapeSelector from "./ShapeSelector";

function ShapeCreator({ onShapeClick }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const handleShapeSelection = (shape) => {
    setShowMenu(false);
    onShapeClick(shape);
  };

  return (
    <>
      <Button onClick={handleClick}>
        <Image src={shapeCreatorUrl} />
      </Button>
      {showMenu && <ShapeSelector onShapeSelect={handleShapeSelection} />}
    </>
  );
}

const Button = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
`;

export default ShapeCreator;
