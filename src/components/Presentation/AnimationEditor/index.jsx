import { useState } from "react";
import { styled } from "styled-components";

import EffectEditor from "./EffectEditor";
import OrderEditor from "./OrderEditor";

function AnimationEditor() {
  const [mode, setMode] = useState("effect");

  return (
    <>
      <Nav>
        <Item onClick={() => setMode("effect")}>Effect</Item>
        <Item onClick={() => setMode("order")}>Order</Item>
      </Nav>
      {mode === "effect" && <EffectEditor />}
      {mode === "order" && <OrderEditor />}
    </>
  );
}

const Nav = styled.nav`
  border-top: 1px solid #bfbebe;
  display: grid;
  grid-template-columns: 1fr 1fr;
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

export default AnimationEditor;
