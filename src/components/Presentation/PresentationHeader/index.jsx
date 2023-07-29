import { useState } from "react";
import { styled } from "styled-components";
import ObjectCreator from "./ObjectCreator";

function PresentationHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <ObjectCreator handleShape={() => setIsOpen(!isOpen)} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default PresentationHeader;
