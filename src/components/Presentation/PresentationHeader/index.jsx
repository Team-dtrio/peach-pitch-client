import { useState } from "react";
import { styled } from "styled-components";
import ObjectCreator from "./ObjectCreator";
import PlayButton from "./PlayButton";

function PresentationHeader({ handlePlay }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <div />
      <ObjectCreator handleShape={() => setIsOpen(!isOpen)} />
      <PlayButtonWrapper>
        <PlayButton onPlayClick={handlePlay} />
      </PlayButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 14px 23px;
  border-top: 1px solid #d9d9d9;
`;
const PlayButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

export default PresentationHeader;
