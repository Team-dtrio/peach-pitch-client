import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Boundary from "../Boundary";

const StyledImageBox = styled.div`
  position: absolute;
  left: ${(props) => props.spec.x}px;
  top: ${(props) => props.spec.y}px;
  width: ${(props) => props.spec.width}px;
  height: ${(props) => props.spec.height}px;
  border: 1px solid ${(props) => props.spec.borderColor};
  user-select: none;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function StyledImageComponent({ spec }) {
  return (
    <StyledImageBox spec={spec}>
      <StyledImage src={spec.src} alt="" />
    </StyledImageBox>
  );
}

const initialImageSpec = {
  x: 100,
  y: 100,
  width: 200,
  height: 200,
  borderColor: "#000000",
  innerColor: "#FFFFFF",
  src: "https://picsum.photos/200/300", // mock image
};

function Image() {
  const [isSelected, setIsSelected] = useState(false);
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [imageSpec, setImageSpec] = useState(initialImageSpec);

  const handleImageClick = () => {
    setIsSelected(!isSelected);
  };

  const onVertexDrag = useCallback(
    (draggedVertexIndex) => (e) => {
      e.preventDefault();
      e.stopPropagation();

      const initialPosition = { x: e.clientX, y: e.clientY };
      const initialSpec = { ...imageSpec };

      const moveHandler = (moveEvent) => {
        const newPosition = {
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        };

        let newImageSpec = { ...imageSpec };
        const heightChange = newPosition.y - initialPosition.y;
        const widthChange = newPosition.x - initialPosition.x;

        switch (draggedVertexIndex) {
          case 0:
            newImageSpec = {
              ...newImageSpec,
              width: initialSpec.width - widthChange,
              height: initialSpec.height - heightChange,
              x: newPosition.x,
              y: newPosition.y,
            };
            break;
          case 2:
            newImageSpec = {
              ...newImageSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height - heightChange,
              y: newPosition.y,
            };
            break;
          case 4:
            newImageSpec = {
              ...newImageSpec,
              width: initialSpec.width + widthChange,
              height: initialSpec.height + heightChange,
            };
            break;
          case 6:
            newImageSpec = {
              ...newImageSpec,
              width: initialSpec.width - widthChange,
              height: initialSpec.height + heightChange,
              x: newPosition.x,
            };
            break;
          case 1:
            newImageSpec = {
              ...newImageSpec,
              height: Math.max(10, initialSpec.height - heightChange),
              y: newPosition.y,
            };
            break;
          case 5:
            newImageSpec = {
              ...newImageSpec,
              height: Math.max(10, initialSpec.height + heightChange),
            };
            break;
          case 3:
            newImageSpec = {
              ...newImageSpec,
              width: Math.max(10, initialSpec.width + widthChange),
            };
            break;
          case 7:
            newImageSpec = {
              ...newImageSpec,
              width: Math.max(10, initialSpec.width - widthChange),
              x: newPosition.x,
            };
            break;
          default:
            break;
        }

        setImageSpec(newImageSpec);
      };

      document.addEventListener("mousemove", moveHandler);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", moveHandler);
        },
        { once: true },
      );
    },
    [imageSpec],
  );

  const onImageDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const initialPosition = {
      x: e.clientX - imageSpec.x,
      y: e.clientY - imageSpec.y,
    };

    const moveHandler = (moveEvent) => {
      setImageSpec((prevSpec) => ({
        ...prevSpec,
        x: moveEvent.clientX - initialPosition.x,
        y: moveEvent.clientY - initialPosition.y,
      }));
    };

    const upHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  };

  useEffect(() => {
    const offset = { x: 1, y: 1 };

    const baseVertices = [
      { x: imageSpec.x, y: imageSpec.y },
      { x: imageSpec.x + imageSpec.width / 2, y: imageSpec.y },
      { x: imageSpec.x + imageSpec.width, y: imageSpec.y },
      {
        x: imageSpec.x + imageSpec.width,
        y: imageSpec.y + imageSpec.height / 2,
      },
      {
        x: imageSpec.x + imageSpec.width,
        y: imageSpec.y + imageSpec.height,
      },
      {
        x: imageSpec.x + imageSpec.width / 2,
        y: imageSpec.y + imageSpec.height,
      },
      { x: imageSpec.x, y: imageSpec.y + imageSpec.height },
      { x: imageSpec.x, y: imageSpec.y + imageSpec.height / 2 },
    ];

    const updatedBoundaryVertices = baseVertices.map((vertex) => ({
      x: vertex.x + offset.x,
      y: vertex.y + offset.y,
    }));

    setBoundaryVertices(updatedBoundaryVertices);
  }, [imageSpec]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleImageClick} onMouseDown={onImageDrag}>
      <StyledImageComponent spec={imageSpec} />
      {isSelected && (
        <Boundary
          boundaryVertices={boundaryVertices}
          onVertexDrag={onVertexDrag}
        />
      )}
    </div>
  );
}

export default Image;
