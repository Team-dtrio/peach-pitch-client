import React from "react";
import { styled } from "styled-components";
import Thumbnail from "../../../Thumbnail";

function SlideCanvas({ spec }) {
  return (
    <Thumbnail scale={0.5}>
      <Canvas spec={spec}>
        <Title spec={spec}>Canvas</Title>
        <Title spec={spec}>Canvas</Title>
        <Title spec={spec}>Canvas</Title>
      </Canvas>
    </Thumbnail>
  );
}

const Title = styled.h1`
`;
const Canvas = styled.div`
  position: relative;
  width: ${({ spec }) => spec.w}px;
  height: ${({ spec }) => spec.h}px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;  transform: scale(${({ scale }) => scale});

  & + & {
    /* margin-right: 20px; */
  }
`;

export default SlideCanvas;
