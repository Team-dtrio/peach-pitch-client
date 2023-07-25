import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import SlideCanvas from "../SlideCanvasLayout/SlideCanvas";

function SlideNavigator({ slides }) {
  const { presentationId } = useParams();
  const { state } = useLocation();
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  function handleContextMenu(event) {
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  }
  function handleCloseContextMenu() {
    setContextMenu({ visible: false, x: 0, y: 0 });
  }

  return (
    <Wrapper>
      {slides.map((slide) => {
        const thumbnailObjects = slide.objects.map(
          ({ type, _id, coordinates, dimensions }) => {
            return {
              type,
              _id,
              x: coordinates.x,
              y: coordinates.y,
              width: dimensions.width,
              height: dimensions.height,
            };
          },
        );

        return (
          <Link
            key={slide._id}
            to={`/presentations/${presentationId}/${slide._id}`}
            state={{ user: state }}
          >
            <SlideCanvas
              canvasSpec={{
                width: 250,
                height: 150,
                scaleX: 250 / 800,
                scaleY: 150 / 500,
                translate: "-100%, -100%",
              }}
              objects={thumbnailObjects}
            />
          </Link>
        );
      })}
      {contextMenu.visible && (
        <ContextMenu style={{ top: contextMenu.y, left: contextMenu.x }}>
          <MenuItem>추가</MenuItem>
          <MenuItem>삭제</MenuItem>
        </ContextMenu>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  background-color: #f1efef;
  max-height: 95%;
  overflow-y: auto;
`;
const ContextMenu = styled.div`
  position: absolute;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  padding: 10px;
  border-radius: 5px;
`;
const MenuItem = styled.div`
  padding: 5px 10px;
  &:hover {
    background-color: #dfdfdf;
    cursor: pointer;
  }
`;

export default SlideNavigator;
