import { useState } from "react";
import { styled } from "styled-components";
import SlideCanvas from "../SlideCanvasLayout/SlideCanvas";

function SlideNavigator() {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const handleContextMenu = event => {
    event.preventDefault();

    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };
  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  return (
    <Wrapper>
      <List>
        <Item
          onContextMenu={handleContextMenu}
          onClick={handleCloseContextMenu}
        >
          <SlideCanvas
            canvasSpec={{ w: 250, h: 130, scaleX: 1, scaleY: 1 }}
            objSpec={{ x: 50, y: 50, w: 150, h: 100, scaleX: 1, scaleY: 1 }}
          />
        </Item>
        <Item>
          <SlideCanvas
            canvasSpec={{ w: 250, h: 130, scaleX: 1, scaleY: 1 }}
            objSpec={{ x: 50, y: 50, w: 150, h: 100, scaleX: 1, scaleY: 1 }}
          />
        </Item>
        <Item>
          <SlideCanvas
            canvasSpec={{ w: 250, h: 130, scaleX: 1, scaleY: 1 }}
            objSpec={{ x: 50, y: 50, w: 150, h: 100, scaleX: 1, scaleY: 1 }}
          />
        </Item>
        <Item>
          <SlideCanvas
            canvasSpec={{ w: 250, h: 130, scaleX: 1, scaleY: 1 }}
            objSpec={{ x: 50, y: 50, w: 150, h: 100, scaleX: 1, scaleY: 1 }}
          />
        </Item>
        <Item>
          <SlideCanvas
            canvasSpec={{ w: 250, h: 130, scaleX: 1, scaleY: 1 }}
            objSpec={{ x: 50, y: 50, w: 150, h: 100, scaleX: 1, scaleY: 1 }}
          />
        </Item>
      </List>
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
const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  padding-left: 20px;
`;
const Item = styled.li`
  margin: 10px 0;
  list-style: none;
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
