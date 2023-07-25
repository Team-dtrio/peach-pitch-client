import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function DropDownLogout() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userInfo");
    navigate("/login");
  }

  return (
    <Wrapper>
      <Button onClick={logOut}>Log Out</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  z-index: 1;
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
