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
  isTitle?: boolean;
  /** hover 시 밑줄을 활성화 시킵니다. */
  underline?: boolean;
  /** icon 포함 여부 */
  containIcon?: boolean;
}

const Link: React.FC<IProps> = ({
  children,
  secondary = false,
  tertiary = false,
  isTitle = false,
  underline = false,
  containIcon = false,
  href = '#',
  onClick,
}) => {
  const props = {
    ...(secondary && { secondary: 'true' }),
    ...(tertiary && { tertiary: 'true' }),
    ...(isTitle && { isTitle: 'true' }),
    ...(containIcon && { containIcon: 'true' }),
    ...(underline && { underline: 'true' }),
  };
  return (
    <EPLink {...props} to={href} onClick={onClick}>
      {children}
    </EPLink>
  );
};

export default Link;
