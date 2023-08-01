import styled from "styled-components";
import { useCallback } from "react";
import useTextMutation from "../../../../../../hooks/useTextMutation";

const Select = styled.select`
  height: 30px;
  border: 1px solid #a9a7a7;
  font-size: 1.1rem;
  background-color: transparent;
  margin-right: 10px;
`;

function FontFamilySelect() {
  const { mutation: textBoxContentMutation, selectedObjectType } =
    useTextMutation();

  const handleFontChange = useCallback(
    (event) => {
      const updateData = {};
      updateData[selectedObjectType] = { fontFamily: event.target.value };
      textBoxContentMutation.mutate(updateData);
    },
    [selectedObjectType, textBoxContentMutation],
  );

  return (
    <Select onChange={handleFontChange}>
      <option value="Arial">Arial</option>
      <option value="Verdana">Verdana</option>
      <option value="Helvetica">Helvetica</option>
      <option value="Tahoma">Tahoma</option>
      <option value="Trebuchet MS">Trebuchet MS</option>
      <option value="Times New Roman">Times New Roman</option>
      <option value="Georgia">Georgia</option>
      <option value="Garamond">Garamond</option>
      <option value="Courier">Courier</option>
      <option value="Lucida Sans">Lucida Sans</option>
    </Select>
  );
}

export default FontFamilySelect;
