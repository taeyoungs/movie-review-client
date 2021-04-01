import React from 'react';
import { MenuGroup, UlContainer, LiContainer, Container } from './WithEmotion';

export interface IProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Menu: React.FC<IProps> = ({ children, isOpen = false, className }) => {
  return (
    <Container className={className}>
      <UlContainer isOpen={isOpen}>
        <MenuGroup>
          <LiContainer>{children}</LiContainer>
        </MenuGroup>
      </UlContainer>
    </Container>
  );
};

export default Menu;
