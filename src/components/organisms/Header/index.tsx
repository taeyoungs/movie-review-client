import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from 'components/molecules/UserMenu';
import SearchBar from 'components/organisms/SearchBar';
import Button, { ButtonAppearance } from 'components/atoms/Button';
import SidebarMenu from 'components/organisms/SidebarMenu';
import {
  HeaderContainer,
  MenuContainer,
  SLink,
  VisibleMenu,
  SidebarIcon,
  LogoTitle,
  LogoContainer,
  SearchIcon,
} from './WithEmotion';
import Icon from 'Icon/Icon';
import { ColorPalette } from 'models/color';
import Cookies from 'js-cookie';

const Header: React.FunctionComponent = () => {
  const [isShow, setIsShow] = useState(false);
  const [isSigned, setIsSigned] = useState(
    Cookies.get('signedin') === 'true' ? true : false
  );
  const location: { state: { reload: boolean } } = useLocation();
  useEffect(() => {
    if (location.state && location.state.reload) {
      setIsSigned(Cookies.get('signedin') === 'true' ? true : false);
    }
  }, [location.state]);

  const handleGoBack = () => setIsShow(false);

  const handleOpen = () => {
    const relativeContainer = document.querySelector('.relative-container');
    if (relativeContainer) {
      relativeContainer.classList.add('open');
    }
  };

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
          <SLink to="/movie">
            <Button appearance={ButtonAppearance.PRIMARY}>영화</Button>
          </SLink>
          <SLink to="/tv">
            <Button appearance={ButtonAppearance.PRIMARY}>TV 프로그램</Button>
          </SLink>
          <SLink to="/review">
            <Button appearance={ButtonAppearance.PRIMARY}>리뷰</Button>
          </SLink>
        </VisibleMenu>
        <SearchBar />
        <SearchIcon onClick={handleOpen}>
          <Icon
            icon="search"
            color={ColorPalette.Neutral.NEUTRAL_0}
            size={14}
          />
        </SearchIcon>
        {!isSigned ? (
          <SLink
            to={(location) => ({
              pathname: '/registration',
              state: { before: location.pathname },
            })}
          >
            <Button appearance={ButtonAppearance.PRIMARY}>로그인</Button>
          </SLink>
        ) : (
          <UserMenu />
        )}
      </MenuContainer>
    </HeaderContainer>
  );
};

export default Header;
