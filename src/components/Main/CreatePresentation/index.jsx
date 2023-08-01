import { useState } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

import NewPresentationModal from "./components/NewPresentationModal";

function CreatePresentation() {
  const [showModal, setShowModal] = useState(false);
  const portal = document.getElementById("modal");

  return (
    <>
      <Section>
        <h2>새 프레젠테이션</h2>
        <Container>
          <NewCanvas onClick={() => setShowModal(true)}>
            <div />
            <div>+ NEW</div>
            <div />
          </NewCanvas>
        </Container>
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
  padding-left: 50px;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-bottom: 10px;
`;
const NewCanvas = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  color: ${({ theme }) => theme.color.app};
  border: 3px solid ${({ theme }) => theme.color.app};
  width: 19.5vw;
  height: 23vh;
  font-weight: 600;
  font-size: 2.7rem;
  text-align: center;
  border-radius: 3%;
  text-transform: uppercase;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default CreatePresentation;
