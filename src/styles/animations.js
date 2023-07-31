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
      opacity: 0.1;
    }

    25% {
      left: -75%;
      background-color: #000;
      border-radius: 0;
      width: 100px;
      height: 100px;
      border: 0;
      opacity: 0.3;
    }

    50% {
      left: -50%;
      background-color: #000;
      border-radius: 0;
      width: 100px;
      height: 100px;
      border: 0;
      opacity: 0.6;
    }

    75% {
      left: -25%;
      background-color: #000;
      border-radius: 0;
      width: 100px;
      height: 100px;
      border: 0;
      opacity: 0.8;
    }

    100% {
      left: 0;
      background-color: #000;
      border-radius: 0;
      width: 100px;
      height: 100px;
      border: 1;
      opacity: 1;
    }
  `,
  "3d-flip": keyframes`
    from {
      transform: rotateY(0deg);
      opacity: 0;
    }

    to {
      transform: rotateY(180deg);
      opacity: 1;
    }
  `,
};

export default animations;
