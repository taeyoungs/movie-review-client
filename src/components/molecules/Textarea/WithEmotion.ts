import styled from '@emotion/styled';
import InlineBlock from 'components/molecules/InlineBlock';
import { ColorPalette } from 'models/color';
import { TextAreaAppearance } from './index';

interface IStyleProps {
  id: string;
  value?: string;
  appearance?: TextAreaAppearance;
  icon?: string;
  error?: string;
  isResize?: boolean;
}

const PETextarea = styled.textarea<IStyleProps>`
  padding: 0.7111em 1em;
  width: 100%;
  border: none;
  outline: none;
  box-sizing: border-box;
  color: ${ColorPalette.Main.TEXT_BODY};
  ${(props) => props.isResize && `resize: none;`}
  transition: box-shadow 100ms ease-in-out 0s;
  &::placeholder {
    font-weight: 600;
  }
  &:disabled {
    cursor: no-drop;
    opacity: 0.6;
    background: ${ColorPalette.Neutral.NEUTRAL_100};
  }
  &:focus {
    ${(props) =>
      !props.error &&
      props.appearance != TextAreaAppearance.SECONDARY &&
      `
      box-shadow: ${ColorPalette.Main.BORDER_PRIMARY} 0px 0px 0px 1px inset;
      `}
  }
  ${(props) =>
    props.appearance === TextAreaAppearance.SECONDARY &&
    `
    padding: 0px;
    background: transparent;
    `}
  ${(props) =>
    props.appearance != TextAreaAppearance.SECONDARY &&
    props.error &&
    `
    box-shadow: ${ColorPalette.Red.RED_600} 0px 0px 0px 1px inset;
    `}
`;

const PELabel = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0.33em;
  margin-right: 1em;
`;

const Wrapper = styled(InlineBlock)``;

const InnerWrapper = styled(InlineBlock)<{
  error?: string;
}>``;

const Error = styled.div<{ error?: string }>`
  color: ${ColorPalette.Red.RED_800};
  font-size: 14px;
`;

export { PETextarea, PELabel, Wrapper, InnerWrapper, Error };
