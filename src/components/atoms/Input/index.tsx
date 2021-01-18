import React from 'react';
import styled from '@emotion/styled';
import { IComponentProps } from 'models/common';

export enum InputType {
  BUTTON = 'button',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  EMAIL = 'email',
  FILE = 'file',
  hidden = 'HIDDEN',
  IMAGE = 'image',
  NUMBER = 'number',
  PASSWORD = 'password',
  RADIO = 'radio',
  SUBMIT = 'submit',
  TEXT = 'text',
  TEL = 'tel',
  SEARCH = 'search',
  TIME = 'time',
}

const EInput = styled.input({
  outline: 'none',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
});

interface IProps extends IComponentProps {
  value: string | number;
  type?: InputType;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Input: React.FC<IProps> = ({
  className,
  value,
  type,
  isCapturing = false,
  onChange,
}) => {
  const changeEvent = isCapturing ? { onChangeCapture: onChange } : onChange;
  return (
    <EInput type={type} {...changeEvent} value={value} className={className} />
  );
};

export default Input;
