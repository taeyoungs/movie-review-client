import { IComponentProps } from 'models/common';
import React from 'react';
import { EButton } from './WithEmotion';

interface IProps extends IComponentProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button: React.FC<IProps> = ({
  children,
  onClick,
  isCapturing = false,
}) => {
  const clickEvent = isCapturing ? { onClickCapture: onClick } : { onClick };
  return <EButton {...clickEvent}>{children}</EButton>;
};

export default Button;
