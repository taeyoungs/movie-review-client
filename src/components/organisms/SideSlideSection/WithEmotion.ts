import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

const SlideContainer = styled.div`
  grid-column: span 1;
  display: none;
  margin-top: 10px;
  margin-left: 10px;
  & .slide-title {
    color: ${ColorPalette.Main.CTA_PRIMARY};
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  @media (min-width: 1024px) {
    display: block;
  }
`;

const UpNextItem = styled.figure`
  display: flex;
  align-items: center;
  margin: 8px;
  cursor: pointer;
  & figcaption {
    margin-left: 20px;
  }
  & figcaption p:nth-of-type(1) {
    color: white;
    margin-bottom: 10px;
    font-size: 16px;
  }
  & figcaption p:nth-of-type(2) {
    font-size: 12px;
    color: ${ColorPalette.Main.CTA_PRIMARY};
  }
  &:hover {
    opacity: 0.8;
  }
`;

const UpNext = styled.div`
  position: relative;
  height: 444px;
  overflow: hidden;
  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    height: 339px;
  }
`;

const UpNextPoster = styled.img`
  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    width: 70px;
  }
  @media (min-width: 1280px) {
    width: 95px;
  }
`;

export { SlideContainer, UpNextItem, UpNext, UpNextPoster };
