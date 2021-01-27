import { IComponentProps } from 'models/common';
import React from 'react';
import EA from './WithEmotion';

interface IProps extends IComponentProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  href?: string;
  children: React.ReactNode;
}

const A: React.FC<IProps> = ({ children, href, onClick, className }) => {
  return (
    <EA className={className} href={href} onClick={onClick}>
      {children}
    </EA>
  );
};

export default A;
