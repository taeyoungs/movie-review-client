import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from 'products/SearchBar';
import Button, { ButtonAppearance } from 'products/Button';
import SidebarMenu from 'products/SidebarMenu';
import {
  HeaderContainer,
  MenuContainer,
  SLink,
  VisibleMenu,
  SidebarIcon,
  LogoTitle,
  LogoContainer,
} from './WithEmotion';
import Icon from 'Icon/Icon';
import { ColorPalette } from 'models/color';

// ToDo: media-query
// 1024px 600px

const Header: React.FunctionComponent = () => {
  const [isShow, setIsShow] = useState(false);

  const handleGoBack = () => setIsShow(false);

  return (
    <HeaderContainer>
      <MenuContainer>
        <SidebarMenu handleGoBack={handleGoBack} isShow={isShow} />
        <SidebarIcon onClick={() => setIsShow(true)}>
          <Icon icon="menu" color={ColorPalette.Neutral.NEUTRAL_0} size={14} />
        </SidebarIcon>
        <LogoContainer>
          <Link to="/">
            <Icon icon="logo" />
          </Link>
          <LogoTitle>Youngs</LogoTitle>
        </LogoContainer>

        <VisibleMenu>
          <SLink to="/movies">
            <Button appearance={ButtonAppearance.PRIMARY}>영화</Button>
          </SLink>
          <SLink to="/shows">
            <Button appearance={ButtonAppearance.PRIMARY}>TV 프로그램</Button>
          </SLink>
          <SLink to="/reviews">
            <Button appearance={ButtonAppearance.PRIMARY}>리뷰</Button>
          </SLink>
        </VisibleMenu>
        <SearchBar />
        <SLink to="/reviews">
          <Button appearance={ButtonAppearance.PRIMARY}>로그인</Button>
        </SLink>
      </MenuContainer>
    </HeaderContainer>
  );
};

export default Header;
