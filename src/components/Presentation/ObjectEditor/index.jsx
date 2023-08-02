import { useState } from "react";
import { styled } from "styled-components";
import brushIconUrl from "../../../assets/brush-icon.svg";
import aniIconUrl from "../../../assets/animation-icon.svg";

import StyleEditor from "./StyleEditor";
import AnimationEditor from "../AnimationEditor";

function ObjectEditor() {
  const [editMode, setEditMode] = useState("style");

  return (
    <Wrapper>
      <Header>
        <StyleButton onClick={() => setEditMode("style")}>
          <img src={brushIconUrl} alt="brush" />
        </StyleButton>
        <AniButton onClick={() => setEditMode("anim")}>
          <img src={aniIconUrl} alt="animation" />
        </AniButton>
      </Header>
      {editMode === "style" && <StyleEditor />}
      {editMode === "anim" && <AnimationEditor />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f1efef;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 20px 0;

  button {
    margin: 0 3px;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const StyleButton = styled.button`
  background-color: #d9d9d9;
  width: 68px;
  height: 30px;
  border: 0;

  &:hover {
    background-color: ${({ theme }) => theme.color.app};
    cursor: pointer;
  }

  img {
    width: 22px;
    height: 23px;
    vertical-align: -5px;
  }
`;
const AniButton = styled.button`
  background-color: #d9d9d9;
  width: 68px;
  height: 30px;
  border: 0;

  &:hover {
    background-color: ${({ theme }) => theme.color.app};
    cursor: pointer;
  }

  img {
    width: 30px;
    height: 31px;
  }
`;

export default ObjectEditor;
