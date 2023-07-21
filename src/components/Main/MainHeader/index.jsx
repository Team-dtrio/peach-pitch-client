import styled from "styled-components";
import peachHomeLogoUrl from "../../../assets/pp-logo-home.svg";

function MainHeader() {
  return (
    <Header>
      <AppLogo src={peachHomeLogoUrl} />
    </Header>
  );
}

const Header = styled.header`
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px #D9D9D9 solid;
`;
const AppLogo = styled.img`
  padding-left: 10px;
  /* width: 42px; */
  /* height: 42px; */
  cursor: pointer;
`;

export default MainHeader;
