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

// for story

const MenuButton = styled.div<{ isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  border-top-left-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  background: ${ColorPalette.Main.BG_SECONDARY};
  cursor: pointer;
  color: ${ColorPalette.Main.BG_PRIMARY};
  font-size: 12px;
  padding: 0.5em;
  & > svg {
    transition: transform 200ms ease-in-out 0s;
    padding-left: 0.25em;
    ${(props) =>
      props.isOpen
        ? `transform: rotate3d(1, 0, 0, 180deg)`
        : `transform: rotate3d(0, 0, 0, 0deg)`}
  }
`;

export { MenuGroup, UlContainer, LiContainer, MenuButton };

// &:hover {
//     color: ${ColorPalette.Yellow.YELLOW_600};
//     box-shadow: ${ColorPalette.Yellow.YELLOW_600} 0px 1px 0px 0px;
//   }

// ${(props) =>
//     props.selected &&
//     `
//       color: ${ColorPalette.Yellow.YELLOW_600};
//       border-bottom: 2px solid ${ColorPalette.Yellow.YELLOW_600};
//       `}
