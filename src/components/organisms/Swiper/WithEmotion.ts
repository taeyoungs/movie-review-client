import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

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
  transition-timing-function: linear;
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

const ArrowBtn = styled.button<{ next: boolean }>`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  outline: 0;
  cursor: pointer;
  &:nth-of-type(2) {
    border-right: 1px solid ${ColorPalette.Main.TEXT_BODY};
    border-left: 1px solid ${ColorPalette.Main.TEXT_BODY};
  }
  ${(props) => props.next && `transform: rotate3d(0, 1, 0, 180deg);`}
`;

const Buttons = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const DotContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Dot = styled.div<{ active: boolean }>`
  display: inline-block;
  width: ${(props) => (props.active ? '20px' : '7px')};
  height: 7px;
  background-color: ${(props) =>
    props.active ? ColorPalette.Main.CTA_PRIMARY : '#fff'};
  border-radius: 20px;
  margin: 0 5px;
  transition: width 0.5s;
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 110px;
  height: 30px;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 auto;
`;

export {
  MainPoster,
  SwiperContainer,
  SwiperWarpper,
  BackdropContainer,
  DuplicateContainer,
  SlideContainer,
  ArrowBtn,
  Buttons,
  DotContainer,
  Dot,
  ArrowContainer,
};
