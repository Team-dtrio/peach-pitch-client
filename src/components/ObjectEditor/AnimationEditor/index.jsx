import { useState } from "react";
import { styled } from "styled-components";
import EffectEditor from "./EffectEditor";
import OrderEditor from "./OrderEditor";

function AnimationEditor() {
  const [ animMode, setAnimMode ] = useState("effect");

  return (
    <>
      <Nav>
        <Item onClick={() => setAnimMode("effect")}>Effect</Item>
        <Item onClick={() => setAnimMode("order")}>Order</Item>
      </Nav>
      { animMode === "effect" && <EffectEditor /> }
      { animMode === "order" && <OrderEditor /> }
    </>
  );
}

const Nav = styled.nav`
  border-top: 1px solid #BFBEBE;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
`;
const Item = styled.li`
  list-style: none;
  padding: 7px 0;
  border-bottom: 1px solid #BFBEBE;
  cursor: pointer;

  &:nth-of-type(1),
  &:nth-of-type(2) {
    border-right: 1px solid #BFBEBE;
  }
`;

export default AnimationEditor;
