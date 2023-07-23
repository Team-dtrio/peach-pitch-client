import { styled } from "styled-components";
import boldUrl from "../../../../../assets/text-icon-bold.svg";
import italicUrl from "../../../../../assets/text-icon-italic.svg";
import underLineUrl from "../../../../../assets/text-icon-underline.svg";
import strikeThoughUrl from "../../../../../assets/text-icon-strike-through.svg";
import startUrl from "../../../../../assets/text-icon-start.svg";
import centerUrl from "../../../../../assets/text-icon-center.svg";
import endUrl from "../../../../../assets/text-icon-end.svg";
import fullUrl from "../../../../../assets/text-icon-full.svg";

function TextEditor() {
  return (
    <Wrapper>
      <Container>
        <Select>
          <option>Inter</option>
        </Select>
        <Select>
          <option>17</option>
        </Select>
      </Container>
      <Container>
        <List>
          <Item><Image src={boldUrl} alt="bold" /></Item>
          <Item><Image src={italicUrl} alt="italic" /></Item>
          <Item><Image src={underLineUrl} alt="underline" /></Item>
          <Item><Image src={strikeThoughUrl} alt="strike-through" /></Item>
        </List>
      </Container>
      <Container>
        <Label>텍스트 색상</Label>
        <Palette type="color" />
      </Container>
      <Container>
        <List>
          <Item><Image src={startUrl} alt="start" /></Item>
          <Item><Image src={centerUrl} alt="center" /></Item>
          <Item><Image src={endUrl} alt="end" /></Item>
          <Item><Image src={fullUrl} alt="full" /></Item>
        </List>
      </Container>
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
const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
`;
const Item = styled.li`
  list-style: none;
  background-color: #D9D9D9;
  padding: 7px;
  border-right: 1px solid #C9C5C5;
  cursor: pointer;

  &:nth-last-child(1) {
    border: 0;
  }
`;
const Image = styled.img`
  width: 20px;
  height: 13px;
`;
const Select = styled.select`
  height: 30px;
  border: 0;
  font-size: 1.1rem;
  background-color: transparent;
  margin-right: 10px;

  &:nth-of-type(2) {
    border: 1px solid #A9A7A7;
    text-align: center;
  }
`;
const Label = styled.label`
  font-size: 1.05rem;
  margin-right: 20px;
`;
const Palette = styled.input`
  width: 138px;
  cursor: pointer;
`;

export default TextEditor;
