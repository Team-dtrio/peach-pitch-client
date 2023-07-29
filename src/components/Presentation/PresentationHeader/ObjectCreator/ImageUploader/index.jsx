import { useState } from "react";
import styled from "styled-components";
import imageUploaderUrl from "../../../../../assets/oc-icon-picture.svg";
import UploadModal from "./UploadModal";

function ImageUploader() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <Image src={imageUploaderUrl} />
      </Button>
      {showModal && <UploadModal setShowModal={setShowModal} />}
    </div>
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
