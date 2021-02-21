import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from 'products/SearchBar';
import Button, { ButtonAppearance } from 'products/Button';
import styled from '@emotion/styled';
import { HeaderContainer, MenuContainer, SLink } from './WithEmotion';
import Icon from 'Icon/Icon';
import { ColorPalette } from 'models/color';
import SidebarMenu from 'products/SidebarMenu';

// ToDo: media-query
// 1024px 600px

const VisibleMenu = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
  }
`;

const SidebarIcon = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }
  border-radius: 50%;
  padding: 0.6rem 1rem;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background: ${ColorPalette.Neutral.NEUTRAL_900};
  }
`;

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
        <Link to="/">
          <Icon icon="logo" />
        </Link>
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
