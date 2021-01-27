import React from 'react';
import styled from '@emotion/styled';
import { ColorPalette, ColorType } from 'models/color';

interface IProps {
  background?: ColorType;
}

const Bg = styled.div<IProps>`
  width: 100vw;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  color: ${ColorPalette.Neutral.NEUTRAL_0};
  padding: 20px;
  background: ${(props) => props.background};
  & > button {
    margin-right: 15px;
  }
`;

const Background: React.FC<IProps> = ({
  children,
  background = ColorPalette.Neutral.NEUTRAL_1000,
}) => {
  return <Bg background={background}>{children}</Bg>;
};

export default Background;
