import { styled } from "styled-components";

function ColorEditor() {
  return (
    <Wrapper>
      <Container>
        <Label>채우기</Label>
        <Palette type="color" />
      </Container>
      <Container>
        <Label>테두리</Label>
        <Palette type="color" />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 20px;
  padding: 0 20px;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  margin: 15px 0;
`;
const Label = styled.label`
  font-size: 1.1rem;
  margin-right: 20px;
`;
const Palette = styled.input`
  width: 138px;
  cursor: pointer;
`;

export default ColorEditor;
