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

  const fonts = [
    "Arial",
    "Courier",
    "Garamond",
    "Georgia",
    "Helvetica",
    "Lucida Sans",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
  ];

  return (
    <Select onChange={handleFontChange}>
      {fonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </Select>
  );
}

export default FontFamilySelect;
