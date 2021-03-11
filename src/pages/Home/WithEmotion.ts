import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

const Main = styled.main`
  min-height: 150vh;
  margin-top: 3.5rem;
`;

const Container = styled.article`
  width: 100%;
  margin: 0px;
  margin-top: 10px;
  @media (min-width: 1024px) {
    max-width: 1024px;
    margin: 0px auto;
    margin-bottom: 40px;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
    margin: 0px auto;
    margin-bottom: 40px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  @media (min-width: 1024px) {
    grid-template-columns: calc(1024px / 3) calc(1024px / 3) calc(1024px / 3);
  }
  @media (min-width: 1280px) {
    grid-template-columns: calc(1280px / 3) calc(1280px / 3) calc(1280px / 3);
  }
`;

const MainPoster = styled.div`
  grid-column: span 1;
  @media (min-width: 1024px) {
    grid-column: span 2;
  }
  @media (min-width: 1280px) {
    grid-column: span 2;
  }
`;

// Swiper 노출시킬 div
const SwiperContainer = styled.div`
  position: relative;
  margin-top: 10px;
  overflow: hidden;
  width: 100%;
  padding-bottom: 50px;
`;

// Swiper 시킬 긴 flex div
const SwiperWarpper = styled.figure`
  width: 100%;
  height: 100%;
  display: flex;
  transition-property: transform;
  transition-timing-function: ease-in-out;
`;

const BackdropContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-right: 17px;
  @media (min-width: 1024px) {
    margin-right: 0px;
  }
  @media (min-width: 1280px) {
    margin-right: 0px;
  }
`;

const DuplicateContainer = styled.div`
  background: black;
`;

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

const ArrowBtn = styled.div<{ next: boolean }>`
  position: absolute;
  top: 45%;
  ${(props) =>
    props.next
      ? `right: 10px;`
      : `transform: rotate3d(0, 1, 0, 180deg);
        left: 10px;`}
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

export {
  Main,
  Container,
  GridContainer,
  MainPoster,
  SwiperContainer,
  SwiperWarpper,
  BackdropContainer,
  DuplicateContainer,
  SlideContainer,
  ArrowBtn,
  UpNextItem,
  UpNext,
  UpNextPoster,
};
