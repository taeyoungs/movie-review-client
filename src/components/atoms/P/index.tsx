import React from 'react';
import { IComponentProps } from 'models/common';
import { ColorPalette, ColorType } from 'models/color';
import { CalculateBox } from 'utils';
import EP from './WithEmotion';

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

interface IProps extends IComponentProps {
  lineHeight?: number;
  weight?: number;
  color?: ColorType;
  wordBreak?: WordBreak;
  whiteSpace?: WhiteSpace;
  size?: number;
  align?: TextAlign;
  /** 생략 여부 */
  ellipsis?: boolean;
}

const P: React.FC<IProps> = ({
  children,
  color = ColorPalette.Neutral.NEUTRAL_1000,
  weight = 300,
  lineHeight = 1.1,
  margin = [0],
  wordBreak = WordBreak.KEEP,
  whiteSpace = WhiteSpace.NORMAL,
  size = 14,
  align = TextAlign.LEFT,
  ellipsis = false,
  className,
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

  return (
    <EP className={className} style={styleProps}>
      {children}
    </EP>
  );
};

export default P;
