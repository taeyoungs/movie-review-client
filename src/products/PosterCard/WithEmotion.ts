import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

const Bg = styled.div<{ isDark?: boolean }>`
  background: ${(props) =>
    props.isDark
      ? ColorPalette.Main.BG_PRIMARY
      : ColorPalette.Neutral.NEUTRAL_0};
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
`;

const RBlock = styled.figure`
  box-sizing: border-box;
  margin-right: 20px;
  width: 180px;
  min-width: 180px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
`;

const Poster = styled.div<{ posterPath: string; isDark?: boolean }>`
  width: 100%;
  height: calc(180px * 1.5);
  background-image: url(${(props) => props.posterPath});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  ${(props) =>
    !props.isDark &&
    `
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    `}
  &:hover {
    opacity: 0.8;
  }
`;

const Rating = styled.div<{ isDark?: boolean }>`
  background: ${ColorPalette.Neutral.NEUTRAL_0};
  border-radius: 50px;
  position: absolute;
  top: -10px;
  padding: 4px 4px 4px 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    !props.isDark &&
    `
    box-shadow: 1px 2px 4px rgb(0 0 0 / 20%);
    `}
`;

const Content = styled.figcaption<{ isDark?: boolean }>`
  padding: 10px 6px 12px 10px;
  position: relative;
  ${(props) =>
    !props.isDark &&
    `
    border: 1px solid ${ColorPalette.Neutral.NEUTRAL_100};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    `}
`;

export { Bg, RBlock, Poster, Rating, Content };
