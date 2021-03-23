import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

const Container = styled.div`
  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 10px;
  }
  @media (min-width: 600px) {
    display: flex;
    transition: box-shadow 100ms ease-in-out 0s;
    flex-grow: 1;
    border-radius: 0.5em;
    &.focus-shadow {
      box-shadow: ${ColorPalette.Yellow.YELLOW_600} 0px 0px 0px 2px;
    }
  }
  @media (min-width: 1024px) {
    margin-left: 0px;
  }
`;

const MenuContainer = styled.div`
  position: relative;
  @media (max-width: 600px) {
    display: none;
  }
`;

const SearchbarInput = styled.input`
  @media (max-width: 600px) {
    color: #fff;
    background: ${ColorPalette.Main.BG_PRIMARY};
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
  }
  @media (min-width: 600px) {
    padding: 0.715em 1em;
    width: 100%;
    color: ${ColorPalette.Main.TEXT_BODY};
    background: ${ColorPalette.Main.BG_SECONDARY};
    margin: 0;
    border: none;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    border-left: 1px solid ${ColorPalette.Neutral.NEUTRAL_300};
    outline: none;
  }
`;

const RelativeContainer = styled.div`
  @media (max-width: 600px) {
    display: none;
    &.open {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${ColorPalette.Main.BG_PRIMARY};
    }
  }
  @media (min-width: 600px) {
    position: relative;
    flex-grow: 1;
  }
`;

const ResultContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  z-index: 50;
  border-radius: 0.5em;
  background: ${ColorPalette.Main.BG_PRIMARY};
`;

const MenuButton = styled.div<{ isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  border-top-left-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  white-space: nowrap;
  background: ${ColorPalette.Main.BG_SECONDARY};
  cursor: pointer;
  color: ${ColorPalette.Main.BG_PRIMARY};
  font-size: 12px;
  padding: 0.5em;
  & > svg {
    transition: transform 200ms ease-in-out 0s;
    padding: 0 0.5em;
    ${(props) =>
      props.isOpen
        ? `transform: rotate3d(1, 0, 0, 180deg)`
        : `transform: rotate3d(0, 0, 0, 0deg)`}
  }
`;

const ExitIcon = styled.div`
  @media (max-width: 600px) {
    border-radius: 50%;
    padding: 0.6rem 1rem;
    cursor: pointer;
    &:hover {
      background: ${ColorPalette.Main.ICON_HOVER_COLOR};
    }
  }
  @media (min-width: 600px) {
    display: none;
  }
`;

export {
  Container,
  SearchbarInput,
  RelativeContainer,
  ResultContainer,
  MenuButton,
  MenuContainer,
  ExitIcon,
};
