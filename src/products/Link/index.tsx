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
  /** hover 시 밑줄을 활성화 시킵니다. */
  underline?: boolean;
  /** icon 포함 여부 */
  containIcon?: boolean;
}

const Link: React.FC<IProps> = ({
  children,
  secondary = false,
  tertiary = false,
  underline = false,
  containIcon = false,
  href = '#',
  onClick,
}) => {
  return (
    <EPLink
      secondary={secondary}
      tertiary={tertiary}
      underline={underline}
      containIcon={containIcon}
      href={href}
      onClick={onClick}
    >
      {children}
    </EPLink>
  );
};

export default Link;
