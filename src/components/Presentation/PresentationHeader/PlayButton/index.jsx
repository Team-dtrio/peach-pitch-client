import { styled } from "styled-components";
import playUrl from "../../../../assets/icon-play.png";

function PlayButton({ onPlayClick }) {
  return (
    <Button onClick={onPlayClick}>
      <Image src={playUrl} />
    </Button>
  );
}

const Button = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;
const Image = styled.img`
  width: 32px;
  height: 32px;
`;

export default PlayButton;
