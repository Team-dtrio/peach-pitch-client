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
        <div>
          <h3>{ userInfo.name }</h3>
          <p>{ userInfo.email }</p>
        </div>
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
  border-bottom: 1px solid #D9D9D9;
`;
const AppLogo = styled.img`
  padding-left: 10px;
  cursor: pointer;
`;
const UserProfile = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
`;
const UserImage = styled.img`
  width: 42px;
  height: 42px;
`;

export default MainHeader;
