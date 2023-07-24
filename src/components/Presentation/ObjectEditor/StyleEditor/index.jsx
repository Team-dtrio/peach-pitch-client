import { useState } from "react";
import { styled } from "styled-components";
import ColorEditor from "./ColorEditor";
import TextEditor from "./TextEditor";

function StyleEditor() {
  const [mode, setMode] = useState("style");

  return (
    <>
      <Nav>
        <Item onClick={() => setMode("style")}>Color</Item>
        <Item onClick={() => setMode("text")}>Text</Item>
        <Item onClick={() => setMode("arrange")}>Arrange</Item>
      </Nav>
      {mode === "style" && <ColorEditor />}
      {mode === "text" && <TextEditor />}
    </>
  );
}

const Nav = styled.nav`
  border-top: 1px solid #bfbebe;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
`;
const Item = styled.div`
  list-style: none;
  padding: 7px 0;
  border-bottom: 1px solid #bfbebe;
  cursor: pointer;

  &:nth-of-type(1),
  &:nth-of-type(2) {
    border-right: 1px solid #bfbebe;
  }
`;

export default StyleEditor;
