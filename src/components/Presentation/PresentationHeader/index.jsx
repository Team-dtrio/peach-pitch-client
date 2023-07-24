import { useState } from "react";
import { styled } from "styled-components";
import ObjectCreator from "./ObjectCreator";
import DropDownMenu from "../../Shared/DropDownMenu";

function PresentationHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <ObjectCreator handleShape={() => setIsOpen(!isOpen)} />
      {isOpen && <DropDownMenu />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default PresentationHeader;
