import styled from '@emotion/styled';
import Button from 'components/atoms/Button';
import { ColorPalette } from 'models/color';
import { ButtonAppearance, ButtonSize, IProps } from '.';

const PEbutton = styled(Button)<IProps>`
  background: ${ColorPalette.Yellow.YELLOW_400};
  display: inline-flex;
  justify-content: center;
  font-family: Nanum Gothic;
  align-items: center;
  box-sizing: border-box;
  border-radius: 3em;
  padding: ${(props) => (props.onlyIcon ? '12px' : '13px 20px')};
  color: ${ColorPalette.Neutral.NEUTRAL_1000};
  transition: all 100ms ease-in-out 0s;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    background: ${ColorPalette.Yellow.YELLOW_400};
    opacity: 0.7;
    cursor: no-drop;
  }
  ${(props) =>
    props.size === ButtonSize.BIG &&
    `
    font-size: 1.125rem;
    padding: ${props.onlyIcon ? '16px' : '18px 24px'};
  `}
  ${(props) =>
    props.size === ButtonSize.SMALL &&
    `
    font-size: 0.75rem;
    padding: ${props.onlyIcon ? '8px' : '8px 16px'};
  `}
  ${(props) =>
    props.appearance === ButtonAppearance.DEFAULT &&
    `
    &:hover:enabled {
        background: ${ColorPalette.Yellow.YELLOW_600};
    }
  `}
  ${(props) =>
    props.appearance === ButtonAppearance.PRIMARY &&
    `
    background: ${ColorPalette.Neutral.NEUTRAL_1000};
    color: ${ColorPalette.Neutral.NEUTRAL_0};
    &:hover:enabled {
      background: ${ColorPalette.Main.ICON_HOVER_COLOR};
    }
    &:disabled {
      background: ${ColorPalette.Neutral.NEUTRAL_1000};
      color: ${ColorPalette.Neutral.NEUTRAL_0};
      opacity: 0.7;
      cursor: no-drop;
    }
  `}
  ${(props) =>
    props.appearance === ButtonAppearance.SECONDARY &&
    `
    background: none;
    color: ${ColorPalette.Yellow.YELLOW_400};
    &:hover:enabled {
      color: ${ColorPalette.Yellow.YELLOW_600};
    }
    &:disabled {
      background: none;
      color: ${ColorPalette.Yellow.YELLOW_400};
      opacity: 0.6;
      cursor: no-drop;
    }
  `}
  ${(props) =>
    props.appearance === ButtonAppearance.OUTLINE &&
    `
    background: ${ColorPalette.Neutral.NEUTRAL_1000};
    color: ${ColorPalette.Yellow.YELLOW_400};
    border: 1px solid ${ColorPalette.Yellow.YELLOW_400};
    &:hover:enabled {
      color: ${ColorPalette.Yellow.YELLOW_600};
      border: 1px solid ${ColorPalette.Yellow.YELLOW_600};
    }
    &:disabled {
      background: ${ColorPalette.Neutral.NEUTRAL_1000};
      color: ${ColorPalette.Yellow.YELLOW_400};
      border: 1px solid ${ColorPalette.Yellow.YELLOW_400};
      opacity: 0.6;
      cursor: no-drop;
    }
  `}
  ${(props) =>
    props.appearance === ButtonAppearance.OUTLINE_PRIMARY &&
    `
    background: ${ColorPalette.Neutral.NEUTRAL_1000};
    color: ${ColorPalette.Neutral.NEUTRAL_0};
    border: 1px solid ${ColorPalette.Neutral.NEUTRAL_0};
    &:hover:enabled {
      color: ${ColorPalette.Main.CTA_PRIMARY};
      border: 1px solid ${ColorPalette.Main.CTA_PRIMARY};
      box-shadow: ${ColorPalette.Main.CTA_PRIMARY} 0px 0px 2px 0px;
      & > svg {
        fill: ${ColorPalette.Main.CTA_PRIMARY};
      }
    }
    &:disabled {
      background: ${ColorPalette.Neutral.NEUTRAL_1000};
      color: ${ColorPalette.Neutral.NEUTRAL_0};
      border: 1px solid ${ColorPalette.Neutral.NEUTRAL_0};
      opacity: 0.6;
      cursor: no-drop;
    }
  `}
`;

export default PEbutton;
