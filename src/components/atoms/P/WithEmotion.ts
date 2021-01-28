import styled from '@emotion/styled';
import { ColorType } from 'models/color';
import { TextAlign, WhiteSpace, WordBreak } from './index';

interface IStyleProps {
  fontColor?: ColorType;
  fontWeight?: number;
  lineHeight?: number;
  margin?: string;
  wordBreak?: WordBreak;
  whiteSpace?: WhiteSpace;
  fontSize?: number;
  textAlign?: TextAlign;
  textOverflow?: string;
  overflow?: string;
  width?: string;
}

const EP = styled.p<IStyleProps>`
  width: ${(props) => props.width};
  height: auto;
  margin: ${(props) => (props.margin ? props.margin : 0)};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.lineHeight};
  word-break: ${(props) => props.wordBreak};
  white-space: ${(props) => props.whiteSpace};
  font-size: ${(props) => props.fontSize}px;
  text-align: ${(props) => props.textAlign};
  text-overflow: ${(props) => props.textOverflow};
  overflow: ${(props) => props.overflow};
  ${(props) => props.fontColor && `color: ${props.fontColor};`}
`;

export default EP;
