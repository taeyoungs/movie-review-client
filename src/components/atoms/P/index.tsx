import React from 'react';
import styled from '@emotion/styled';
import { IComponentProps } from 'models/common';
import { ColorPalette, ColorType } from 'models/color';
import { CalculateBox } from 'utils';

export enum WordBreak {
  KEEP = 'keep-all',
  BREAK = 'break-all',
}

export enum WhiteSpace {
  NORMAL = 'normal',
  NOWRAP = 'nowrap',
  PRE = 'pre',
  PRE_LINE = 'pre-line',
  PRE_WRAP = 'pre-wrap',
}

export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

const EP = styled.p({
  width: '100%',
  height: 'auto',
  margin: 0,
});

interface IProps extends IComponentProps {
  lineHeight?: number;
  weight?: number;
  color?: ColorType;
  wordBreak?: WordBreak;
  whiteSpace?: WhiteSpace;
  size?: number;
  align?: TextAlign;
  ellipsis?: boolean;
}

// ellipsis: 생략

const P: React.FC<IProps> = ({
  children,
  color = ColorPalette.Black.BLACK,
  weight = 300,
  lineHeight = 1.1,
  margin = [0],
  wordBreak = WordBreak.KEEP,
  whiteSpace = WhiteSpace.NORMAL,
  size = 12,
  align = TextAlign.LEFT,
  ellipsis = false,
}) => {
  const styleProps = {
    color,
    fontWeight: weight,
    lineHeight,
    margin: CalculateBox(margin),
    wordBreak,
    whiteSpace: ellipsis ? WhiteSpace.NOWRAP : whiteSpace,
    fontSize: size,
    textAlign: align,
    textOverflow: ellipsis ? 'ellipsis' : 'clip',
    overflow: ellipsis ? 'hidden' : 'visible',
    width: ellipsis ? 'calc(100% - 0px)' : '100%',
  };

  return <EP style={styleProps}>{children}</EP>;
};

export default P;
