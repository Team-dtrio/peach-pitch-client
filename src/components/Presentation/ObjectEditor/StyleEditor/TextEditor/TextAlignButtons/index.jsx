import styled from "styled-components";
import { useCallback } from "react";
import useTextMutation from "../../../../../../hooks/useTextMutation";

import startUrl from "../../../../../../assets/text-icon-start.svg";
import centerUrl from "../../../../../../assets/text-icon-center.svg";
import endUrl from "../../../../../../assets/text-icon-end.svg";
import fullUrl from "../../../../../../assets/text-icon-full.svg";

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
`;

const Item = styled.li`
  list-style: none;
  background-color: #d9d9d9;
  padding: 7px;
  border-right: 1px solid #c9c5c5;
  cursor: pointer;

  &:nth-last-child(1) {
    border: 0;
  }
`;

const Image = styled.img`
  width: 20px;
  height: 13px;
`;

function TextAlignButtons() {
  const { mutation: textBoxContentMutation, selectedObjectType } =
    useTextMutation();

  const handleTextAlignChange = useCallback(
    (textAlign) => {
      if (selectedObjectType === "Textbox") {
        const updateData = {};
        updateData[selectedObjectType] = { textAlign };
        textBoxContentMutation.mutate(updateData);
      }
    },
    [selectedObjectType, textBoxContentMutation],
  );

  return (
    <List>
      <Item onClick={() => handleTextAlignChange("left")}>
        <Image src={startUrl} alt="left" />
      </Item>
      <Item onClick={() => handleTextAlignChange("center")}>
        <Image src={centerUrl} alt="center" />
      </Item>
      <Item onClick={() => handleTextAlignChange("right")}>
        <Image src={endUrl} alt="right" />
      </Item>
      <Item onClick={() => handleTextAlignChange("justify")}>
        <Image src={fullUrl} alt="justify" />
      </Item>
    </List>
  );
}

export default TextAlignButtons;
