import React from 'react';
import PEButton from './WithEmotion';

export enum ButtonSize {
  BIG = 'big',
  MEDIUM = 'medium',
  SMALL = 'small',
}
// export type ButtonAppearance = 'default' | 'primary' | 'secondary';
export enum ButtonAppearance {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface IProps {
  /** 버튼을 클릭했을 때 호출할 함수 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼의 사이즈를 설정합니다. */
  size?: ButtonSize;
  /** 버튼의 종류를 설정합니다. */
  appearance?: ButtonAppearance;
  /** 버튼 안에 들어갈 내용 */
  children: React.ReactNode;
  /** 버튼을 비활성화 시킵니다. */
  disabled?: boolean;
}

/** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다.  */
const Button: React.FC<IProps> = ({
  children,
  onClick,
  size = ButtonSize.MEDIUM,
  appearance = ButtonAppearance.DEFAULT,
  disabled = false,
}) => {
  return (
    <PEButton
      size={size}
      appearance={appearance}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </PEButton>
  );
};

export default Button;
