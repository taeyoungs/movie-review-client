import React from 'react';
import { IComponentProps } from 'models/common';
import { ColorPalette, ColorType } from 'models/color';
import { CalculateBox } from 'utils';
import ESpan from './WithEmotion';

export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

interface IProps extends IComponentProps {
  lineHeight?: number;
  weight?: number;
  color?: ColorType;
  size?: number;
  align?: TextAlign;
}

const Span: React.FC<IProps> = ({
  children,
  lineHeight = 1,
  weight = 300,
  color = ColorPalette.Neutral.NEUTRAL_1000,
  size = 12,
  margin = [0],
  align = TextAlign.LEFT,
  className,
}) => {
  const styleProps = {
    lineHeight,
    fontWeight: weight,
    color: color.toString(),
    fontSize: size,
    margin: CalculateBox(margin),
    textAlign: align,
  };

  return (
    <ESpan className={className} style={styleProps}>
      {children}
    </ESpan>
  );
};

export default Span;
