import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #121212;
  padding: 1rem;
  color: white;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #f05a9e;
`;

const Menu = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const RightMenu = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Navbar = () => {
    return (
      <NavbarContainer>
        <Logo>
          <Link to="/">YONGCHA</Link> {/* 메인 페이지 이동 */}
        </Logo>
        <Menu>
          <Link to="/search">찾기</Link> {/* 검색 페이지 이동 */}
          <Link to="/movies">영화</Link> {/* 영화 페이지 이동 */}
        </Menu>
        <RightMenu>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </RightMenu>
      </NavbarContainer>
    );
  };
  

export default Navbar;
