import { styled } from "styled-components";
import { firebaseAuth } from "../../../../services/firebase";

function DropDownLogout() {
  return (
    <Wrapper>
      <Button onClick={() => firebaseAuth.signOut()}>Log Out</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: 10%;
  right: 1%;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.beige};
`;
const Button = styled.button`
  background-color: transparent;
  border: 0;
  font-weight: 600;
  cursor: pointer;
`;

export default DropDownLogout;
