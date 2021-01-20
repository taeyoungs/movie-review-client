import React from 'react';
import { EButton } from './WithEmotion';

export type ButtonSize = 'big' | 'medium' | 'small';
export type ButtonAppearance = 'default' | 'primary' | 'secondary';

export interface IProps {
  /** 버튼을 클릭했을 때 호출할 함수 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼의 사이즈를 설정합니다. */
  size?: ButtonSize;
  /** 버튼의 종류를 설정합니다. */
  appearance?: ButtonAppearance;
  /** 버튼 안에 들어갈 내용 */
  children: React.ReactNode;
  /** 이벤트 캡처링 설정합니다. */
  isCapturing?: boolean;
  /** 버튼을 비활성화 시킵니다. */
  disabled?: boolean;
}

/** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다.  */
const Button: React.FC<IProps> = ({
  children,
  isCapturing = false,
  onClick,
  size = 'medium',
  appearance = 'default',
  disabled = false,
}) => {
  const clickEvent = isCapturing ? { onClickCapture: onClick } : { onClick };

  return (
    <EButton
      {...clickEvent}
      appearance={appearance}
      disabled={disabled}
      size={size}
    >
      {children}
    </EButton>
  );
};

export default Button;
