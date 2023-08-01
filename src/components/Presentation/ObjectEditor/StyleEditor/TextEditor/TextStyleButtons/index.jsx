import styled from "styled-components";
import { useCallback } from "react";
import useTextMutation from "../../../../../../hooks/useTextMutation";

import boldUrl from "../../../../../../assets/text-icon-bold.svg";
import italicUrl from "../../../../../../assets/text-icon-italic.svg";
import underLineUrl from "../../../../../../assets/text-icon-underline.svg";

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

function TextStyleButtons() {
  const { mutation: textBoxContentMutation, selectedObjectType } =
    useTextMutation();

  const handleStyleChange = useCallback(
    (event) => {
      const style = event.target.alt;
      const updateData = {};

      if (style === "bold") {
        updateData[selectedObjectType] = { fontWeight: "bold" };
      } else if (style === "italic") {
        updateData[selectedObjectType] = { fontStyle: style };
      } else if (style === "underline") {
        updateData[selectedObjectType] = { textDecoration: style };
      }

      textBoxContentMutation.mutate(updateData);
    },
    [selectedObjectType, textBoxContentMutation],
  );

  return (
    <List>
      <Item onClick={handleStyleChange}>
        <Image src={boldUrl} alt="bold" />
      </Item>
      <Item onClick={handleStyleChange}>
        <Image src={italicUrl} alt="italic" />
      </Item>
      <Item onClick={handleStyleChange}>
        <Image src={underLineUrl} alt="underline" />
      </Item>
    </List>
  );
}

export default TextStyleButtons;
