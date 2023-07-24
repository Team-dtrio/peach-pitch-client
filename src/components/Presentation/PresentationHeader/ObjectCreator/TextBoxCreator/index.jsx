import { styled } from "styled-components";
import textboxCreatorUrl from "../../../../../assets/oc-icon-text.svg";

function TextboxCreator() {
  return (
    <Button>
      <Image src={textboxCreatorUrl} />
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

export default TextboxCreator;
