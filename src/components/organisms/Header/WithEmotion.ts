import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height: 3.5rem;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.25rem;
  background: #1f1f1f;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px;
  width: 100vw;
  @media (min-width: 600px) {
    padding: 0px 0.75rem;
  }
  @media (min-width: 1024px) {
    width: 1024px;
    margin: 0px auto;
  }
  @media (min-width: 1280px) {
    width: 1280px;
    margin: 0px auto;
  }
`;

const LogoContainer = styled.h1`
  position: relative;
`;

const LogoTitle = styled.span`
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
`;

const SLink = styled(Link)`
  text-decoration: none;
  margin: 0 10px;
`;

const VisibleMenu = styled.nav`
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
    background: ${ColorPalette.Main.ICON_HOVER_COLOR};
  }
`;

const SearchIcon = styled.div`
  @media (max-width: 600px) {
    border-radius: 50%;
    margin-left: auto;
    padding: 0.6rem 1rem;
    cursor: pointer;
    &:hover {
      background: ${ColorPalette.Main.ICON_HOVER_COLOR};
    }
  }
  @media (min-width: 600px) {
    display: none;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

export {
  HeaderContainer,
  MenuContainer,
  SLink,
  VisibleMenu,
  SidebarIcon,
  LogoContainer,
  LogoTitle,
  SearchIcon,
  AvatarContainer,
};
