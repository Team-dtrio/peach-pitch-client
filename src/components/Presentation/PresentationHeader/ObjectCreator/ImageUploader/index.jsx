import { styled } from "styled-components";
import imageUploaderUrl from "../../../../../assets/oc-icon-picture.svg";

function ImageUploader() {
  return (
    <Button>
      <Image src={imageUploaderUrl} />
    </Button>
  );
}

const Button = styled.button`
  background-color: transparent;
  margin: 0 30px;
  border: 0;
  cursor: pointer;
`;
const Image = styled.img`
  width: 32px;
  height: 32px;
`;

export default ImageUploader;
