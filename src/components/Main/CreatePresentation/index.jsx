import { useState } from "react";
import { createPortal } from "react-dom";
import { ThemeProvider, styled } from "styled-components";
import appTheme from "../../../styles/appTheme";
import Modal from "../../Modal";

function CreatePresentation() {
  const [ showModal, setShowModal ] = useState(false);
  const portal = document.getElementById("modal");

  function onModalClick() {
    setShowModal(false);
  }

  return (
    <>
      <MainArticle>
        <h2>새 프레젠테이션</h2>
        <ThemeProvider theme={appTheme}>
          <NewCanvas onClick={() => setShowModal(true)}>+ new</NewCanvas>
        </ThemeProvider>
      </MainArticle>
      { showModal && createPortal(<Modal onModalClick={onModalClick} />, portal) }
    </>
  );
}

const MainArticle = styled.article`
  padding: 15px 0;
  padding-left: 30px;
`;
const NewCanvas = styled.div`
  width: 250px;
  height: 150px;
  color: ${({ theme }) => theme.color};
  border: 2px solid ${({ theme }) => theme.color};
  font-size: 1.5rem;
  text-align: center;
  border-radius: 10px;
  text-transform: uppercase;
`;

export default CreatePresentation;
