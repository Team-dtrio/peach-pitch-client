import styled from "styled-components";
import { useCallback } from "react";
import useTextMutation from "../../../../../../hooks/useTextMutation";

const Label = styled.label`
  font-size: 1.1rem;
  margin-right: 20px;
`;

const Palette = styled.input`
  width: 138px;
  cursor: pointer;
`;

function TextColorPicker() {
  const { mutation: textBoxContentMutation, selectedObjectType } =
    useTextMutation();

  const handleColorChange = useCallback(
    (event) => {
      const updateData = {};
      updateData[selectedObjectType] = { textColor: event.target.value };
      textBoxContentMutation.mutate(updateData);
    },
    [selectedObjectType, textBoxContentMutation],
  );

  return (
    <>
      <Label>Text Color</Label>
      <Palette type="color" onChange={handleColorChange} value="#d9d9d9" />
    </>
  );
}

export default TextColorPicker;
