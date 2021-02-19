import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from 'products/SearchBar';
import Button, { ButtonAppearance } from 'products/Button';
import { HeaderContainer, MenuContainer, SLink } from './WithEmotion';
import Icon from 'Icon/Icon';

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
