import React from 'react';
import styled from '@emotion/styled';
import { IComponentProps } from 'models/common';
import { ColorPalette, ColorType } from 'models/color';
import { CalculateBox } from 'utils';

export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

const ESpan = styled.span({});

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
  color = ColorPalette.Black.BLACK,
  size = 12,
  margin = [0],
  align = TextAlign.LEFT,
}) => {
  const styleProps = {
    lineHeight,
    fontWeight: weight,
    color,
    fontSize: size,
    margin: CalculateBox(margin),
    textAlign: align,
  };

  return <ESpan style={styleProps}>{children}</ESpan>;
};

export default Span;
