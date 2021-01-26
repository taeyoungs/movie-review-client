import styled from '@emotion/styled';
import Button from 'components/atoms/Button';
import { ColorPalette } from 'models/color';
import { ButtonAppearance, ButtonSize } from '.';

interface IStyleProps {
  size: ButtonSize;
  appearance: ButtonAppearance;
}

const PEbutton = styled(Button)<IStyleProps>`
  background: ${ColorPalette.Yellow.YELLOW_400};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 2rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  padding: 0 1rem;
  color: ${ColorPalette.Neutral.NEUTRAL_1000};
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    background: ${ColorPalette.Yellow.YELLOW_400};
    opacity: 0.7;
    cursor: default;
  }
  ${(props) =>
    props.size === ButtonSize.BIG &&
    `
    height: 2.5rem;
    font-size: 1.125rem;
    padding: 0 1.5rem;
  `}
  ${(props) =>
    props.size === ButtonSize.MEDIUM &&
    `
    height: 2rem;
    font-size: 1rem;
    padding: 0 1rem;
  `}
  ${(props) =>
    props.size === ButtonSize.SMALL &&
    `
    height: 1.75rem;
    font-size: 0.75rem;
    padding: 0 0.875rem;
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
      background: ${ColorPalette.Neutral.NEUTRAL_900};
    }
    &:disabled {
      background: ${ColorPalette.Neutral.NEUTRAL_1000};
      color: ${ColorPalette.Neutral.NEUTRAL_0};
      opacity: 0.7;
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
    }
  `}
`;

export default PEbutton;
