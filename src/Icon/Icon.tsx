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
  style?: Record<string, string | number>;
}

/** 아이콘을 나타내고 싶을 때 `Icon` 컴포넌트를 이용하세요. */
const Icon: React.FC<IProps> = ({ icon, color, size, className, style }) => {
  const SVGIcon = icons[icon];

  const styleProps = {
    ...style,
    fill: color || 'currentColor',
    width: size,
    height: 'auto',
  };

  return <SVGIcon style={styleProps} className={className} />;
};

export default Icon;
