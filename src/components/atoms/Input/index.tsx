import React from 'react';
import { IComponentProps } from 'models/common';
import EInput from './WithEmotion';

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

interface IProps extends IComponentProps {
  id: string;
  /** `input`에 들어오는 값 */
  value?: string;
  /** `input`의 타입을 설정합니다. */
  type?: InputType;
  /** `input`의 value가 변했을 때 호출할 함수 */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** `input`에서 벗어났을 때 호출할 함수 */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** `input`을 클릭했을 때 호출할 함수 */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** `input` focus 이후 키보드 자판을 눌렀을 때 호출할 함수 */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** `input` focus 이후 키보드 자판에서 손가락을 땔 때 호출할 함수 */
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** 이벤트 캡처링을 설정합니다. */
  isCapturing?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const Input: React.FC<IProps> = ({
  id,
  value,
  type = 'text',
  isCapturing = false,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  className,
  placeholder = 'Placeholder',
  disabled = false,
}) => {
  const changeEvent = isCapturing ? { onChangeCapture: onChange } : onChange;
  const blurEvent = isCapturing ? { onBlurCapture: onBlur } : onBlur;
  const focusEvent = isCapturing ? { onFocusCapture: onFocus } : onFocus;
  const keyDownEvent = isCapturing
    ? { onKeyDownCapture: onKeyDown }
    : onKeyDown;
  const keyUpEvent = isCapturing ? { onKeyUpCapture: onKeyUp } : onKeyUp;
  return (
    <EInput
      id={id}
      className={className}
      type={type}
      value={value}
      {...changeEvent}
      {...blurEvent}
      {...focusEvent}
      {...keyDownEvent}
      {...keyUpEvent}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
