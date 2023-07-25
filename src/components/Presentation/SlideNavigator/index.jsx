import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { AuthContext } from "../../../contexts/AuthContext";
import SlideCanvas from "../SlideCanvasLayout/SlideCanvas";
import axiosInstance from "../../../services/axios";

function SlideNavigator({ slides }) {
  const { firebaseUser } = useContext(AuthContext);
  const userId = firebaseUser._id;
  const { presentationId } = useParams();
  const { state } = useLocation();
  const queryClient = useQueryClient();

  const addSlideMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        `/users/${userId}/presentations/${presentationId}/slides`,
      );
      return response.data;
    },
    onSuccess: async () => {
      const response = await axiosInstance.get(
        `/users/${userId}/presentations/${presentationId}/slides`,
      );
    },
  });

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const [selectedSlideId, setSelectedSlideId] = useState(null);

  function handleContextMenu(event, id) {
    setSelectedSlideId(id);
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  }

  function handleCloseContextMenu() {
    setContextMenu({ visible: false, x: 0, y: 0 });
  }

  const handleAddSlide = async () => {
    try {
      await addSlideMutation.mutateAsync();
      handleCloseContextMenu();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSlide = async () => {
    await axiosInstance.delete(
      `/users/${userId}/presentations/${presentationId}/slides/${selectedSlideId}`,
    );
    handleCloseContextMenu();
  };

  return (
    <Wrapper>
      {slides.map((slide) => (
        <Link
          draggable="true"
          key={slide._id}
          to={`/presentations/${presentationId}/${slide._id}`}
          state={{ user: state }}
          onContextMenu={(event) => handleContextMenu(event, slide._id)}
          onClick={handleCloseContextMenu}
        >
          <SlideCanvas
            canvasSpec={{
              width: 250,
              height: 150,
              scaleX: 250 / 800,
              scaleY: 150 / 500,
              translate: "-100%, -100%",
            }}
            objects={slide.objects}
          />
        </Link>
      ))}
      {contextMenu.visible && (
        <ContextMenu style={{ top: contextMenu.y, left: contextMenu.x }}>
          <MenuItem onClick={handleAddSlide}>추가</MenuItem>
          <MenuItem onClick={handleDeleteSlide}>삭제</MenuItem>
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
