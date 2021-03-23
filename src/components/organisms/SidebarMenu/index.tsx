import React from 'react';
import { Link } from 'react-router-dom';
import P from 'components/atoms/P';
import { ColorPalette } from 'models/color';
import Icon, { IconType } from 'Icon/Icon';
import {
  BgContainer,
  Container,
  Exit,
  ExitContainer,
  MenuContainer,
  MenuList,
  SidebarContainer,
} from './WithEmotion';

interface IProps {
  isShow?: boolean;
  handleGoBack(): void;
}

interface IMenuProps {
  menuName: string;
  pathName: string;
  iconName: IconType;
}

const SidebarMenu: React.FC<IProps> = ({ isShow = false, handleGoBack }) => {
  const menuList: Array<IMenuProps> = [
    { menuName: '영화', pathName: '/movies', iconName: 'movie' },
    { menuName: 'TV 프로그램', pathName: '/movies', iconName: 'show' },
    { menuName: '사람', pathName: '/people', iconName: 'person' },
    { menuName: '리뷰', pathName: '/reviews', iconName: 'review' },
  ];

  return (
    <Container isShow={isShow}>
      <SidebarContainer isShow={isShow}>
        <ExitContainer>
          <Exit onClick={handleGoBack}>
            <Icon
              icon="cross"
              size={16}
              color={ColorPalette.Neutral.NEUTRAL_0}
            />
          </Exit>
        </ExitContainer>
        <MenuList>
          {menuList.map((menu, index) => (
            <Link to={menu.pathName} key={index}>
              <MenuContainer>
                <Icon size={30} icon={menu.iconName} />
                <P size={15} color={ColorPalette.Neutral.NEUTRAL_0}>
                  {menu.menuName}
                </P>
              </MenuContainer>
            </Link>
          ))}
        </MenuList>
      </SidebarContainer>
      <BgContainer isShow={isShow} onClick={handleGoBack} />
    </Container>
  );
};

export default SidebarMenu;
