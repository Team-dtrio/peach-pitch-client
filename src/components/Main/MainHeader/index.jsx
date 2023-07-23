import { Link } from "react-router-dom";
import styled from "styled-components";
import peachHomeLogoUrl from "../../../assets/pp-logo-home.svg";

function MainHeader({ userInfo }) {
  return (
    <Header>
      <Link to="/">
        <AppLogo src={peachHomeLogoUrl} />
      </Link>
      <UserProfile>
        <UserNameTitle>{userInfo.name}</UserNameTitle>
        <UserEmailParagraph>{userInfo.email}</UserEmailParagraph>
        <UserImage src={userInfo.picture} alt="user" />
      </UserProfile>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #d9d9d9;
`;
const AppLogo = styled.img`
  padding-left: 10px;
  cursor: pointer;
`;
const UserProfile = styled.section`
  display: flex;
`;
const UserNameTitle = styled.h4`
  font-size: 1rem;
`;
const UserEmailParagraph = styled.p`
  font-size: 0.7rem;
`;
const UserImage = styled.img`
  width: 42px;
  height: 42px;
`;

export default MainHeader;
