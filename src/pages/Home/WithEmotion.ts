import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

const Main = styled.main`
  margin-top: 3.5rem;
  margin-bottom: 100px;
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

const HomeScrollSection = styled.section`
  width: 100%;
  padding-top: 15px;
  margin: 0 0 20px 0;
  @media (min-width: 1024px) {
    max-width: 1024px;
    margin: 0px auto 20px;
    padding-top: 20px;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
    margin: 0px auto 20px;
    padding-top: 20px;
  }
  & h2 {
    color: #f1c40f;
    font-size: 25px;
    margin: 20px 0px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
`;

const ScrollDiv = styled.div`
  padding: 20px 0px 40px;
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  min-height: 370px;
  position: relative;
  &::-webkit-scrollbar {
    height: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #f1c40f;
    border-radius: 10px;
    width: ;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const SectionInner = styled.div`
  padding: 0 0 0 30px;
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
  ArrowBtn,
  HomeScrollSection,
  ScrollDiv,
  SectionInner,
};
