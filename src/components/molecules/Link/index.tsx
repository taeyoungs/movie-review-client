import React from 'react';
import EPLink from './WithEmotion';

export interface IProps {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** 링크 내용을 설정합니다. */
  children: React.ReactNode;
  /** 두 번째 링크 형태 */
  secondary?: boolean;
  /** 세 번째 링크 형태 */
  tertiary?: boolean;
  /** 네 번째 링크 형태 */
  istitle?: boolean;
  /** hover 시 밑줄을 활성화 시킵니다. */
  underline?: boolean;
  /** icon 포함 여부 */
  containIcon?: boolean;
  whiteSpace?: boolean;
}

const Link: React.FC<IProps> = ({
  children,
  secondary = false,
  tertiary = false,
  istitle = false,
  underline = false,
  containIcon = false,
  whiteSpace = false,
  href = '#',
  onClick,
}) => {
  const props = {
    ...(secondary && { secondary: 'true' }),
    ...(tertiary && { tertiary: 'true' }),
    ...(istitle && { istitle: 'true' }),
    ...(containIcon && { containIcon: 'true' }),
    ...(underline && { underline: 'true' }),
  };
  return (
    <EPLink
      {...props}
      to={href}
      onClick={onClick}
      style={{ whiteSpace: whiteSpace ? 'nowrap' : 'normal' }}
    >
      {children}
    </EPLink>
  );
};

export default Link;
