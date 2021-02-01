import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

const EMenuItem = styled.li<{ selected: boolean }>`
  border-radius: 0.5em;
  padding: 6px 8px;
  margin: 2px 0px;
  font-size: 14px;
  cursor: pointer;
  color: ${ColorPalette.Main.TEXT_BODY};
  &:hover {
    background: ${ColorPalette.Yellow.YELLOW_300};
  }
  ${(props) =>
    props.selected &&
    `
    background: ${ColorPalette.Yellow.YELLOW_300};
    `}
`;

export default EMenuItem;
