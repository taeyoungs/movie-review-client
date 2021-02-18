import React from 'react';
import styled from '@emotion/styled';
import * as icons from './svg';

export type IconType = keyof typeof icons;
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
    fill: color || 'currentColor',
    width: size,
  };

  return <SVGIcon style={style} {...styleProps} className={className} />;
};

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.color || 'currentColor'};
  width: ${(props) => props.size}px;
  height: auto;
  transition: fill 200ms ease-in-out 0s;
`;

export default StyledIcon;
