import React from 'react';
import styled from '@emotion/styled';
import { ColorPalette, ColorType } from 'models/color';

interface IProps {
  background?: ColorType;
  direction?: boolean;
}

const Bg = styled.div<IProps>`
  width: 100vw;
  height: 30vh;
  justifycontent: center;
  alignitems: center;
  display: flex;
  flex-direction: ${(props) => (props.direction ? 'row' : 'column')};
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
  direction = true,
}) => {
  return (
    <Bg direction={direction} background={background}>
      {children}
    </Bg>
  );
};

export default Background;
