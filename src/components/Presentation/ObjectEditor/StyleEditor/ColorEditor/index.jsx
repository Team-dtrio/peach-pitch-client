import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ObjectContext } from "../../../../../contexts/ObjectContext";
import axiosInstance from "../../../../../services/axios";

function ColorEditor() {
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

  const fillColorChangeMutation = useMutation(
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

  const borderColorChangeMutation = useMutation(
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

  const fillColoredObjects = ["Circle", "Triangle", "Square", "Textbox"];
  const borderColoredObjects = [
    "Circle",
    "Triangle",
    "Square",
    "Textbox",
    "Image",
  ];

  function handleFillColorChange(event) {
    if (fillColoredObjects.includes(selectedObjectType)) {
      const updateData = {};
      updateData[selectedObjectType] = { fillColor: event.target.value };
      fillColorChangeMutation.mutate(updateData);
    }
  }

  function handleBorderColorChange(event) {
    if (borderColoredObjects.includes(selectedObjectType)) {
      const updateData = {};
      updateData[selectedObjectType] = { borderColor: event.target.value };
      borderColorChangeMutation.mutate(updateData);
    }
  }

  return (
    <Wrapper>
      <Container>
        <Label>Fill</Label>
        <Palette
          type="color"
          onChange={handleFillColorChange}
          value="#d9d9d9"
        />
      </Container>
      <Container>
        <Label>Border</Label>
        <Palette
          type="color"
          onChange={handleBorderColorChange}
          value="#d9d9d9"
        />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 20px;
  padding: 0 20px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  margin: 15px 0;
`;

const Label = styled.label`
  font-size: 1.1rem;
  margin-right: 20px;
`;

const Palette = styled.input`
  width: 138px;
  cursor: pointer;
`;

export default ColorEditor;
