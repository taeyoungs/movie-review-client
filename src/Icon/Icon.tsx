import React from 'react';
import * as icons from './svg';

type IconType = keyof typeof icons;
export const iconTypes: IconType[] = Object.keys(icons) as any[];

export interface IProps {
  /** 아이콘 타입 */
  icon: IconType;
  /** 아이콘 색상 */
  color?: string;
  /** 아이콘 크기 */
  size?: string | number;
  className?: string;
}

/** 아이콘을 나타내고 싶을 때 `Icon` 컴포넌트를 이용하세요. */
const Icon: React.FC<IProps> = ({ icon, color, size, className }) => {
  const SVGIcon = icons[icon];

  return (
    <SVGIcon
      style={{ fill: color || 'currentColor', width: size, height: 'auto' }}
      className={className}
    />
  );
};

export default Icon;
