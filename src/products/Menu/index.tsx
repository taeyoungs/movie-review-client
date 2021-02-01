import React from 'react';
import { MenuGroup, UlContainer, LiContainer } from './WithEmotion';

export interface IProps {
  isOpen?: boolean;
  children?: React.ReactNode;
}

const Menu: React.FC<IProps> = ({ children, isOpen = false }) => {
  return (
    <div style={{ position: 'absolute' }}>
      <UlContainer isOpen={isOpen}>
        <MenuGroup>
          <LiContainer>{children}</LiContainer>
        </MenuGroup>
      </UlContainer>
    </div>
  );
};

export default Menu;
