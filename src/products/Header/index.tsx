import React from 'react';
import styled from '@emotion/styled';
import Icon from 'Icon/Icon';
import { Link } from 'react-router-dom';
import SearchBar from 'products/SearchBar';
import Button, { ButtonAppearance } from 'products/Button';

const HeaderContainer = styled.nav`
  display: flex;
  width: 100%;
  height: 3.5rem;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.25rem;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px auto;
  width: 1280px;
`;

const SLink = styled(Link)`
  text-decoration: none;
  margin: 0 10px;
`;

const Header: React.FunctionComponent = () => {
  return (
    <HeaderContainer>
      <MenuContainer>
        <Link to="/">
          <Icon icon="logo" />
        </Link>
        <SLink to="/movies">
          <Button appearance={ButtonAppearance.PRIMARY}>영화</Button>
        </SLink>
        <SLink to="/shows">
          <Button appearance={ButtonAppearance.PRIMARY}>TV 프로그램</Button>
        </SLink>
        <SLink to="/reviews">
          <Button appearance={ButtonAppearance.PRIMARY}>리뷰</Button>
        </SLink>
        <SearchBar />
        <SLink to="/reviews">
          <Button appearance={ButtonAppearance.PRIMARY}>로그인</Button>
        </SLink>
      </MenuContainer>
    </HeaderContainer>
  );
};

export default Header;
