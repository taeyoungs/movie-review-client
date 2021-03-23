import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

const UlContainer = styled.div<{ isOpen: boolean }>`
  border-radius: 0.5em;
  box-sizing: border-box;
  margin-top: 3px;
  margin-bottom: 3px;
  background: ${ColorPalette.Main.BG_SECONDARY};
  width: 200px;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    95% {
      opacity: 0;
    }
    to {
      display: none;
    }
  }
  ${(props) =>
    props.isOpen
      ? `display: block; animation: fade-in 0.5s;`
      : `display: none;`}
`;

const MenuGroup = styled.ul`
  box-sizing: border-box;
  width: auto;
  height: auto;
  margin: 0px;
  padding: 0px;
  list-style: none;
`;

const LiContainer = styled.div`
  padding: 8px;
`;

const Container = styled.div`
  position: absolute;
  z-index: 50;
`;

export { MenuGroup, UlContainer, LiContainer, Container };
