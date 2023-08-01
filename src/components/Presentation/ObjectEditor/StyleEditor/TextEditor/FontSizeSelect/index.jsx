import styled from "styled-components";
import { useCallback } from "react";
import useTextMutation from "../../../../../../hooks/useTextMutation";

const Select = styled.select`
  height: 30px;
  border: 1px solid #a9a7a7;
  font-size: 1.1rem;
  background-color: transparent;
  margin-right: 10px;
  text-align: center;
`;

function FontSizeSelect() {
  const { mutation: textBoxContentMutation, selectedObjectType } =
    useTextMutation();

  const handleFontSizeChange = useCallback(
    (event) => {
      const updateData = {};
      updateData[selectedObjectType] = { fontSize: event.target.value };
      textBoxContentMutation.mutate(updateData);
    },
    [selectedObjectType, textBoxContentMutation],
  );

  const fontSizes = Array.from({ length: 21 }, (_, index) => 10 + index * 2);

  return (
    <Select onChange={handleFontSizeChange}>
      {fontSizes.map((fontSize) => (
        <option key={fontSize} value={fontSize}>
          {fontSize}
        </option>
      ))}
    </Select>
  );
}

export default FontSizeSelect;
