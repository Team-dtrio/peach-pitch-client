import { keyframes } from "styled-components";

const animations = {
  "fade-in": keyframes`
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  `,
  "block-wipe": keyframes`
    0%, 60%, 75%, 90%, 100% {
        transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
        opacity: 0;
        transform: translate3d(-3000px, 0, 0);
    }

    60% {
        opacity: 1;
        transform: translate3d(25px, 0, 0);
    }

    75% {
        transform: translate3d(-10px, 0, 0);
    }

    90% {
        transform: translate3d(5px, 0, 0);
    }

    100% {
        opacity: 1;
        transform: none;
    }
  `,
  "3d-flip": keyframes`
    0% {
      opacity: 0;
      transform: perspective(400px) rotateY(0);
      animation-timing-function: ease-out;
    }

    40% {
      transform: perspective(400px) translateZ(150px) rotateY(170deg);
      animation-timing-function: ease-out;
    }

    50% {
      transform: perspective(400px) translateZ(150px) rotateY(190deg) scale(1);
      animation-timing-function: ease-in;
    }

    80% {
      transform: perspective(400px) rotateY(360deg) scale(.95);
      animation-timing-function: ease-in;
    }

    100% {
      transform: perspective(400px) scale(1);
      animation-timing-function: ease-in;
    }
  `,
};

export default animations;
