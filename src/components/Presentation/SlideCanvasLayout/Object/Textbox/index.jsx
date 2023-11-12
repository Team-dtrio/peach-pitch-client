import { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { debounce, throttle } from "lodash";
import { ObjectContext } from "../../../../../contexts/ObjectContext";
import Boundary from "../Boundary";
import axiosInstance from "../../../../../services/axios";

function EditableTextBox({ spec }) {
  const queryClient = useQueryClient();
  const { selectedObjectId, selectedObjectType } = useContext(ObjectContext);

  function getUser() {
    const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
    return loggedInUser;
  }

  const user = getUser();
  const userId = user._id;
  const objectId = selectedObjectId;
  const { presentationId, slideId } = useParams();

  const textBoxContentMutation = useMutation(
    (updateData) =>
      axiosInstance.put(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects/${objectId}/`,
        updateData,
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["objects", slideId]);
      },
    },
  );

  const handleTextBoxContentChange = throttle((event) => {
    const updateData = {};
    updateData[selectedObjectType] = { content: event.target.innerText };
    textBoxContentMutation.mutate(updateData);
  }, 500);

  return (
    <StyledTextBox spec={spec}>
      <EditableDiv
        spec={spec}
        contentEditable
        suppressContentEditableWarning
        onInput={handleTextBoxContentChange}
      >
        {spec.content}
      </EditableDiv>
    </StyledTextBox>
  );
}

function Textbox({ id, spec, onContextMenu, updateContent }) {
  const [boundaryVertices, setBoundaryVertices] = useState([]);
  const [textBoxSpec, setTextBoxSpec] = useState(spec);

  function getUser() {
    const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
    return loggedInUser;
  }
  const user = getUser();
  const userId = user._id;
  const { presentationId, slideId } = useParams();
  const queryClient = useQueryClient();
  const { selectedObjectId, selectedObjectType, selectObject } =
    useContext(ObjectContext);

  const isSelected =
    id === selectedObjectId && spec.type === selectedObjectType;

  function handleTextBoxClick(event) {
    event.stopPropagation();
    selectObject(id, spec.type);
  }

  function handleContentChange(newContent) {
    setTextBoxSpec((prevSpec) => ({
      ...prevSpec,
      content: newContent,
    }));
    updateContent(newContent);
  }

  const updatedTextBoxSpec = {
    type: textBoxSpec.type,
    coordinates: { x: textBoxSpec.x, y: textBoxSpec.y },
    dimensions: { width: textBoxSpec.width, height: textBoxSpec.height },
    boundaryVertices: textBoxSpec.boundaryVerticles,
    currentAnimation: textBoxSpec.currentAnimation,
    _id: textBoxSpec._id,
    Textbox: {
      fillColor: textBoxSpec.fillColor,
      borderColor: textBoxSpec.borderColor,
    },
  };
  const updateTextBoxSpec = useMutation(
    async () => {
      const objectId = textBoxSpec._id;
      const response = await axiosInstance.put(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects/${objectId}`,
        updatedTextBoxSpec,
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("slides");
      },
    },
  );

  const onVertexDrag = useCallback(
    (draggedVertexIndex) => (event) => {
      event.preventDefault();
      event.stopPropagation();

      const initialPosition = { x: event.clientX, y: event.clientY };
      const initialSpec = { ...textBoxSpec };

      const moveHandler = throttle((moveEvent) => {
        const newPosition = {
          x: moveEvent.clientX,
          y: moveEvent.clientY,
        };

        let newTextBoxSpec = { ...textBoxSpec };
        const heightChange = newPosition.y - initialPosition.y;
        const widthChange = newPosition.x - initialPosition.x;

        switch (draggedVertexIndex) {
          case 0:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: Math.max(10, initialSpec.width - widthChange),
              height: Math.max(10, initialSpec.height - heightChange),
              x: initialSpec.x + widthChange,
              y: initialSpec.y + heightChange,
            };
            break;
          case 2:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: Math.max(10, initialSpec.width + widthChange),
              height: Math.max(10, initialSpec.height - heightChange),
              y: initialSpec.y + heightChange,
            };
            break;
          case 4:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: Math.max(10, initialSpec.width + widthChange),
              height: Math.max(10, initialSpec.height + heightChange),
            };
            break;
          case 6:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: Math.max(10, initialSpec.width - widthChange),
              height: Math.max(10, initialSpec.height + heightChange),
              x: initialSpec.x + widthChange,
            };
            break;
          case 1:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              height: Math.max(10, initialSpec.height - heightChange),
              y: initialSpec.y + heightChange,
            };
            break;
          case 5:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              height: Math.max(10, initialSpec.height + heightChange),
            };
            break;
          case 3:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: Math.max(10, initialSpec.width + widthChange),
            };
            break;
          case 7:
            newTextBoxSpec = {
              ...newTextBoxSpec,
              width: Math.max(10, initialSpec.width - widthChange),
              x: initialSpec.x + widthChange,
            };
            break;
          default:
            break;
        }

        setTextBoxSpec(newTextBoxSpec);
      }, 200);

      const upHandler = debounce(async () => {
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", upHandler);
        await updateTextBoxSpec.mutateAsync();
      }, 500);

      document.addEventListener("mousemove", moveHandler);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", moveHandler);
        },
        { once: true },
      );
    },
    [textBoxSpec, updateTextBoxSpec],
  );

  function onTextBoxDrag(event) {
    event.stopPropagation();

    const initialPosition = {
      x: event.clientX - textBoxSpec.x,
      y: event.clientY - textBoxSpec.y,
    };

    const moveHandler = throttle((moveEvent) => {
      setTextBoxSpec((prevSpec) => ({
        ...prevSpec,
        x: moveEvent.clientX - initialPosition.x,
        y: moveEvent.clientY - initialPosition.y,
      }));
    }, 150);

    const upHandler = async () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
      await updateTextBoxSpec.mutateAsync();
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  }

  useEffect(() => {
    setTextBoxSpec(spec);
  }, [spec]);

  useEffect(() => {
    const offset = { x: 1, y: 1 };

    const baseVertices = [
      { x: textBoxSpec.x, y: textBoxSpec.y },
      { x: textBoxSpec.x + textBoxSpec.width / 2, y: textBoxSpec.y },
      { x: textBoxSpec.x + textBoxSpec.width, y: textBoxSpec.y },
      {
        x: textBoxSpec.x + textBoxSpec.width,
        y: textBoxSpec.y + textBoxSpec.height / 2,
      },
      {
        x: textBoxSpec.x + textBoxSpec.width,
        y: textBoxSpec.y + textBoxSpec.height,
      },
      {
        x: textBoxSpec.x + textBoxSpec.width / 2,
        y: textBoxSpec.y + textBoxSpec.height,
      },
      { x: textBoxSpec.x, y: textBoxSpec.y + textBoxSpec.height },
      { x: textBoxSpec.x, y: textBoxSpec.y + textBoxSpec.height / 2 },
    ];

    const updatedBoundaryVertices = baseVertices.map((vertex) => ({
      x: vertex.x + offset.x,
      y: vertex.y + offset.y,
    }));

    setBoundaryVertices(updatedBoundaryVertices);
  }, [textBoxSpec]);

  return (
    <div
      onClick={handleTextBoxClick}
      onMouseDown={onTextBoxDrag}
      onContextMenu={onContextMenu}
      aria-hidden="true"
    >
      <EditableTextBox
        spec={textBoxSpec}
        onContentChange={handleContentChange}
      />
      {isSelected && (
        <Boundary
          boundaryVertices={boundaryVertices}
          onVertexDrag={onVertexDrag}
        />
      )}
    </div>
  );
}

const StyledTextBox = styled.div`
  position: absolute;
  left: ${({ spec }) => spec.x}px;
  top: ${({ spec }) => spec.y}px;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  text-align: ${({ spec }) => spec.textAlign};
  border: ${({ spec }) => spec.borderColor};
  background-color: ${({ spec }) => spec.fillColor};
  user-select: none;
  padding: 5px;
  box-sizing: border-box;
`;

const EditableDiv = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  overflow: auto;
  outline: none;
  white-space: pre-wrap;
  color: ${({ spec }) => spec.textColor};
  font-size: ${({ spec }) => spec.fontSize}px;
  font-family: ${({ spec }) => spec.fontFamily};
  font-style: ${({ spec }) => spec.fontStyle};
  font-weight: ${({ spec }) => spec.fontWeight};
  text-decoration: ${({ spec }) => spec.textDecoration};
  line-height: 1.5;
`;

export default Textbox;
