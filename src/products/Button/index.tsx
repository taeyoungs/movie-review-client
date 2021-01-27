import React from 'react';
import PEButton from './WithEmotion';

export enum ButtonSize {
  BIG = 'big',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export enum ButtonAppearance {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline',
  OUTLINE_PRIMARY = 'outline_primary',
}

export interface IProps {
  /** 버튼을 클릭했을 때 호출할 함수 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼의 사이즈를 설정합니다. <br /> `string` */
  size?: ButtonSize;
  /** 버튼의 종류를 설정합니다. <br /> `string` */
  appearance?: ButtonAppearance;
  /** 버튼 안에 들어갈 내용 */
  children: React.ReactNode;
  /** 버튼을 비활성화 시킵니다. */
  disabled?: boolean;
  /** 원형 모양의 `Icon` 버튼으로 설정합니다. */
  onlyIcon?: boolean;
}

/** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다.  */
const Button: React.FC<IProps> = ({
  children,
  onClick,
  size = ButtonSize.MEDIUM,
  appearance = ButtonAppearance.DEFAULT,
  disabled = false,
  onlyIcon = false,
}) => {
  return (
    <PEButton
      size={size}
      appearance={appearance}
      disabled={disabled}
      onClick={onClick}
      onlyIcon={onlyIcon}
    >
      {children}
    </PEButton>
  );
};

export default Button;
