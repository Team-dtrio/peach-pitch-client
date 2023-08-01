import { styled } from "styled-components";
import FontFamilySelect from "./FontFamilySelect";
import FontSizeSelect from "./FontSizeSelect";
import TextStyleButtons from "./TextStyleButtons";
import TextColorPicker from "./TextColorPicker";
import TextAlignButtons from "./TextAlignButtons";

function TextEditor() {
  return (
    <Wrapper>
      <Container>
        <FontFamilySelect />
        <FontSizeSelect />
      </Container>
      <TextStyleButtons />
      <Container>
        <TextColorPicker />
      </Container>
      <TextAlignButtons />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 20px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  margin: 15px 0;
`;

export default TextEditor;
