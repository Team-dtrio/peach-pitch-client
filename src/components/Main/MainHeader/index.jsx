import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import peachHomeLogoUrl from "../../../assets/pp-logo-home.svg";
import DropDownLogout from "./components/DropDownLogout";

function MainHeader({ userInfo, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Header>
      <Wrapper>
        <div>
          <StyledLink to="/">
            <AppLogo src={peachHomeLogoUrl} />
          </StyledLink>
        </div>
        <UserProfile onClick={() => setIsOpen(!isOpen)}>
          <div>
            <h3>{userInfo.name}</h3>
            <p>{userInfo.email}</p>
          </div>
          <UserImage src={userInfo.picture} alt="user" />
        </UserProfile>
        {isOpen && <DropDownLogout />}
      </Wrapper>
      {children}
    </Header>
  );
}

const Header = styled.header`
  border-bottom: 1.5px solid ${({ theme }) => theme.color.gray};
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;
const StyledLink = styled(Link)``;
const AppLogo = styled.img`
  cursor: pointer;
  margin-top: 20px;
`;
const UserProfile = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-right: 10px;
    p {
      margin-top: -10px;
      color: #666;
    }
  }
`;
const UserImage = styled.img`
  width: 48px;
  height: 48px;
`;

export default MainHeader;
