import styled from '@emotion/styled';
import Input from 'components/atoms/Input';
import InlineBlock from 'components/molecules/InlineBlock';
import { ColorPalette } from 'models/color';
import { InputAppearance, InputOrientation } from './index';

interface IStyleProps {
  id: string;
  value?: string;
  appearance?: InputAppearance;
  orientation?: InputOrientation;
  icon?: string;
  error?: string;
}

const PEInput = styled(Input)<IStyleProps>`
  padding: 0.715em 1em;
  color: ${ColorPalette.Main.TEXT_BODY};
  transition: box-shadow 100ms ease-in-out 0s;
  margin-bottom: 10px;
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
      props.appearance != InputAppearance.SECONDARY &&
      `
      box-shadow: ${ColorPalette.Main.BORDER_PRIMARY} 0px 0px 0px 1px inset;
      `}
  }
  ${(props) =>
    props.appearance === InputAppearance.PRIMARY &&
    `
    box-shadow: ${ColorPalette.Main.BORDER_SECONDARY} 0px 0px 0px 1px inset;
    `}
  ${(props) =>
    props.appearance === InputAppearance.SECONDARY &&
    `
    padding: 0px;
    `}
  ${(props) =>
    props.appearance === InputAppearance.PILL &&
    `
    padding: 0.5em 1em;
    border-radius: 3em;
    font-size: 12px;
    box-shadow: ${ColorPalette.Main.BORDER_SECONDARY} 0px 0px 0px 1px inset;
    `}
  ${(props) =>
    props.appearance != InputAppearance.SECONDARY &&
    props.error &&
    `
    box-shadow: ${ColorPalette.Red.RED_600} 0px 0px 0px 1px inset;
    `}
`;

const PELabel = styled.label<{ orientation?: InputOrientation }>`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  ${(props) =>
    props.orientation === InputOrientation.HORIZONTAL &&
    `
    padding-right: 20px;
    display: table-cell;
    `}
  ${(props) =>
    props.orientation === InputOrientation.VERTICAL &&
    `
    margin-bottom: 0.33em;
    `}
`;

const Wrapper = styled(InlineBlock)<{ orientation?: InputOrientation }>`
  ${(props) =>
    props.orientation === InputOrientation.HORIZONTAL &&
    `
    display: table-row;
    `}
`;

const InnerWrapper = styled(InlineBlock)<{
  orientation?: InputOrientation;
  error?: string;
}>`
  ${(props) =>
    props.orientation === InputOrientation.HORIZONTAL &&
    `
    width: auto;
    display: table-cell;
    `}
  &:hover {
    ${(props) =>
      props.error &&
      `
        & > input + div {
          opacity: 0;
          transform: translate3d(100%, -50%, 0);
        }
      `}
  }
`;

const Error = styled.div<{ error?: string }>`
  position: absolute;
  top: 50%;
  padding: 0.25em 1.25em 0.1em 0.5em;
  opacity: 1;
  transform: translate3d(0%, -50%, 0);
  transition: all 200ms ease-out 0s;
  right: 0px;
  color: ${ColorPalette.Red.RED_800};
  font-size: 12px;
`;

export { PEInput, PELabel, Wrapper, InnerWrapper, Error };
