import { styled } from "styled-components";
import shapeCreatorUrl from "../../../../../assets/oc-icon-shape.svg";

function ShapeCreator({ onShapeClick }) {
  return (
    <Button onClick={onShapeClick}>
      <Image src={shapeCreatorUrl} />
    </Button>
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
