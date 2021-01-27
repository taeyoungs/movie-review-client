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
}

const PEInput = styled(Input)<IStyleProps>`
  padding: 0.715em 1em;
  &:focus {
    border: 2px solid ${ColorPalette.Main.BORDER_PRIMARY};
  }
  ${(props) =>
    props.appearance === InputAppearance.DEFAULT &&
    `
    border: 2px solid transparent;
    `}
  ${(props) =>
    props.appearance === InputAppearance.PRIMARY &&
    `
    border: 2px solid ${ColorPalette.Main.BORDER_SECONDARY};
    `}
  ${(props) =>
    props.appearance === InputAppearance.SECONDARY &&
    `
    padding: 0px;
    border: none;
    &:focus {
        border: none;
    }
    `}
  ${(props) =>
    props.appearance === InputAppearance.PILL &&
    `
    padding: 0.5em 1em;
    border-radius: 3em;
    font-size: 12px;
    border: 2px solid ${ColorPalette.Main.BORDER_SECONDARY};
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

const InnerWrapper = styled(InlineBlock)<{ orientation?: InputOrientation }>`
  ${(props) =>
    props.orientation === InputOrientation.HORIZONTAL &&
    `
    width: auto;
    display: table-cell;
    `}
`;

export { PEInput, PELabel, Wrapper, InnerWrapper };
