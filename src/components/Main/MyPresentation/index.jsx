import React from "react";

import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import SlideCanvas from "../../Presentation/SlideCanvasLayout/SlideCanvas";

function MyPresentation() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/z");
  }

  return (
    <MainArticle>
      <h2>내 프레젠테이션</h2>
      <SlideThumbnail>
        <SlideCanvas spec={{ w: 250, h: 150 }} onClick={() => handleClick()} />
        <SlideCanvas spec={{ w: 250, h: 150 }} />
        <SlideCanvas spec={{ w: 250, h: 150 }} />
        <SlideCanvas spec={{ w: 250, h: 150 }} />
      </SlideThumbnail>
    </MainArticle>
  );
}

const MainArticle = styled.article`
  padding: 15px 0;
  padding-left: 30px;
`;
const SlideThumbnail = styled.div`
  display: flex;
`;

export default MyPresentation;
