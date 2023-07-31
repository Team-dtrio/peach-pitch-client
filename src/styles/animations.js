import { keyframes } from "styled-components";

const animations = {
  "fade-in": keyframes`
    0% {
      opacity: 0;
      transform: scale(0);
    }

    25% {
      opacity: 0.25;
      transform: scale(0.25);
    }

    50% {
      opacity: 0.5;
      transform: scale(0.5);
    }

    75% {
      opacity: 0.75;
      transform: scale(0.75);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  `,
  "block-wipe": keyframes`
    0% {
      left: -100%;
      border-radius: 0;
      border: 0;
    }

    25% {
      left: -75%;
      background-color: #000;
      border-radius: 0;
      width: 100px;
      height: 100px;
      border: 0;
    }

    50% {
      left: -50%;
      background-color: #000;
      border-radius: 0;
      width: 100px;
      height: 100px;
      border: 0;
    }

    75% {
      left: -25%;
      background-color: #000;
      border-radius: 0;
      width: 100px;
      height: 100px;
      border: 0;
    }

    100% {
      left: 0;
      background-color: #000;
      border-radius: 0;
      width: 100px;
      height: 100px;
      border: 1;
    }
  `,
  "3d-flip": keyframes`
    from {
      transform: rotateY(0deg);
    }

    to {
      transform: rotateY(360deg);
    }
  `,
};

export default animations;
