import { styled } from "styled-components";

function EffectEditor() {
  return (
    <List>
      <Button>fade in</Button>
      <Button>block wipe</Button>
      <Button>3d flip</Button>
    </List>
  );
}

export default EffectEditor;

const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  padding-left: 35px;
  padding-right: 35px;
`;

const Button = styled.button`
  padding: 5px 10px;
  &:hover {
    background-color: #dfdfdf;
    cursor: pointer;
  }
`;
