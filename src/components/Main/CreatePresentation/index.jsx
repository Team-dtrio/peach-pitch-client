import { useState } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

import NewPresentationModal from "../../Shared/Modal/NewPresentationModal";

function CreatePresentation() {
  const [showModal, setShowModal] = useState(false);
  const portal = document.getElementById("modal");

  return (
    <>
      <Section>
        <h2>새 프레젠테이션</h2>
        <NewCanvas onClick={() => setShowModal(true)}>
          <span>+ new</span>
        </NewCanvas>
      </Section>
      {showModal &&
        createPortal(
          <NewPresentationModal toggleModal={() => setShowModal(false)} />,
          portal,
        )}
    </>
  );
}

const Section = styled.section`
  padding: 15px 0;
  padding-left: 30px;
`;
const NewCanvas = styled.div`
  width: 250px;
  height: 150px;
  color: ${({ theme }) => theme.color.app};
  border: 2px solid ${({ theme }) => theme.color.app};
  font-size: 1.5rem;
  text-align: center;
  border-radius: 10px;
  text-transform: uppercase;
`;

export default CreatePresentation;
