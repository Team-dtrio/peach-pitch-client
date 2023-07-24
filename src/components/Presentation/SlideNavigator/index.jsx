import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import SlideCanvas from "../SlideCanvasLayout/SlideCanvas";

function SlideNavigator({ slides }) {
  const { presentationId } = useParams();
  const { state: user } = useLocation();
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  function handleContextMenu(event) {
    event.preventDefault();

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
        return (
          <Link
            key={slide._id}
            to={`/presentations/${presentationId}/${slide.slideId}`}
            state={{ user }}
          >
            <SlideCanvas
              canvasSpec={{ w: 250, h: 150, scaleX: 1, scaleY: 1 }}
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
