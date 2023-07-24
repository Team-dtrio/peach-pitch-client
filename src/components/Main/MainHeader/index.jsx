import { Link } from "react-router-dom";
import styled from "styled-components";
import peachHomeLogoUrl from "../../../assets/pp-logo-home.svg";

function MainHeader({ userInfo, children }) {
  return (
    <Header>
      <Wrapper>
        <div>
          <StyledLink to="/">
            <AppLogo src={peachHomeLogoUrl} />
          </StyledLink>
        </div>
        <UserProfile>
          <div>
            <h3>{userInfo.name}</h3>
            <p>{userInfo.email}</p>
          </div>
          <UserImage src={userInfo.picture} alt="user" />
        </UserProfile>
      </Wrapper>
      {children}
    </Header>
  );
}

const Header = styled.header`
  border-bottom: 1px solid #d9d9d9;
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
const UserNameTitle = styled.h4`
  font-size: 1rem;
`;
const UserEmailParagraph = styled.p`
  font-size: 0.7rem;
`;
const UserImage = styled.img`
  width: 48px;
  height: 48px;
`;

export default MainHeader;
