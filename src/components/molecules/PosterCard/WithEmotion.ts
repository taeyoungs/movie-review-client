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
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
`;

const Poster = styled.img<{ isDark?: boolean; isLazy: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.isLazy ? 0 : 1)};
  cursor: pointer;
  ${(props) =>
    !props.isDark &&
    `
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    `}
  transition: opacity 400ms;
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

const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 145.37037%;
`;

const PosterInner = styled.div<{
  isDark: boolean;
  title: string;
  isPoster: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  overflow: hidden;
  transition: 300ms;
  ${(props) =>
    props.isDark &&
    `
    border-radius: 5px;
  `}

  ${(props) =>
    !props.isPoster &&
    `
  &:before {
    content: '${props.title}';
    font-size: 15px;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 20px;
    white-space: pre-wrap;
    overflow: hidden;
    color: #808080;
    padding: 0 10px;
  }
  `}
`;

export { Bg, RBlock, Poster, Rating, Content, PosterWrapper, PosterInner };
