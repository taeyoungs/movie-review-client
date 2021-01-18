import React from 'react';
import styled from '@emotion/styled';
import { IComponentProps } from 'models/common';

export enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
  RESET = 'reset',
}

const EButton = styled.button({
  outline: 'none',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
});

interface IProps extends IComponentProps {
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  type?: ButtonType;
}

const Button: React.FC<IProps> = ({
  children,
  isCapturing = false,
  onClick,
  type = ButtonType.BUTTON,
  className,
}) => {
  const clickEvent = isCapturing ? { onClickCapture: onClick } : { onClick };

  return (
    <EButton type={type} {...clickEvent} className={className}>
      {children}
    </EButton>
  );
};

export default Button;
