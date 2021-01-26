import React from 'react';
import { IComponentProps } from 'models/common';
import EButton from './WithEmotion';

interface IProps extends IComponentProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<IProps> = ({
  children,
  onClick,
  isCapturing = false,
  className,
  disabled = false,
}) => {
  const clickEvent = isCapturing ? { onClickCapture: onClick } : { onClick };
  return (
    <EButton className={className} disabled={disabled} {...clickEvent}>
      {children}
    </EButton>
  );
};

export default Button;
