import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

const Container = styled.div<{ isFocus: boolean }>`
  display: flex;
  transition: box-shadow 100ms ease-in-out 0s;
  flex-grow: 1;
  border-radius: 0.5em;
  ${(props) =>
    props.isFocus &&
    `
    box-shadow: ${ColorPalette.Yellow.YELLOW_600} 0px 0px 0px 2px;
    `}
`;

const SearchbarInput = styled.input`
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
`;

export { Container, SearchbarInput };
