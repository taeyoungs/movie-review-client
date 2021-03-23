import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

const Container = styled.aside<{ isShow: boolean }>`
  inset: 0;
  position: fixed;
  z-index: 101;
  visibility: ${(props) => (props.isShow ? 'visible' : 'hidden')};
  transition: visibility 0.5s ease-in-out 0s;
`;

const BgContainer = styled.div<{ isShow: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
  display: ${(props) => (props.isShow ? 'block' : 'none')};
`;

const SidebarContainer = styled.div<{ isShow: boolean }>`
  position: relative;
  height: 100%;
  box-sizing: border-box;
  z-index: 100;
  width: 280px;
  background: ${ColorPalette.Main.BG_PRIMARY};

  @keyframes showUp {
    0% {
      transform: translate(-100%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes showOut {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-100%, 0);
    }
  }

  animation: 0.5s ${(props) => (props.isShow ? 'showUp' : 'showOut')} forwards;
`;

const ExitContainer = styled.div`
  min-height: 3.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid ${ColorPalette.Neutral.NEUTRAL_600};
  margin-bottom: 10px;
`;

const Exit = styled.div`
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
  padding: 0.6rem 1rem;
  border-radius: 50%;
  &:hover {
    background: ${ColorPalette.Main.ICON_HOVER_COLOR};
  }
`;

const MenuList = styled.ul`
  list-style: none;
`;

const MenuContainer = styled.li`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 1rem;
  height: 3rem;
  & > svg {
    fill: grey;
    padding-right: 10px;
  }
  &:hover {
    background: ${ColorPalette.Main.ICON_HOVER_COLOR};
    & > svg {
      fill: ${ColorPalette.Neutral.NEUTRAL_0};
    }
  }
`;

export {
  Container,
  BgContainer,
  SidebarContainer,
  ExitContainer,
  Exit,
  MenuList,
  MenuContainer,
};
