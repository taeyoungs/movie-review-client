import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ColorPalette } from 'models/color';

interface ILinkProps {
  secondary?: string;
  tertiary?: string;
  istitle?: string;
  underline?: string;
  containIcon?: string;
}

const EPLink = styled(Link)<ILinkProps>`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  height: auto;
  color: ${ColorPalette.Main.CTA_PRIMARY};
  text-decoration: none;
  &:hover {
    color: ${ColorPalette.Yellow.YELLOW_600};
    ${(props) => props.underline && `text-decoration: underline;`}
  }
  ${(props) =>
    Boolean(props.istitle) &&
    `
        color: ${ColorPalette.Main.TEXT_BODY};
        &:hover {
            ${props.underline && `text-decoration: underline;`}
        }
    `}
  ${(props) =>
    props.secondary &&
    `
        color: ${ColorPalette.Main.CTA_SECONDARY};
        &:hover {
            color: ${ColorPalette.Neutral.NEUTRAL_300};
            ${props.underline && `text-decoration: underline;`}
        }
    `}
  ${(props) =>
    props.tertiary &&
    `
        color: ${ColorPalette.Neutral.NEUTRAL_300};
        & > svg {
            fill: ${ColorPalette.Neutral.NEUTRAL_300};
        }
        &:hover {
            color: ${ColorPalette.Neutral.NEUTRAL_0};
            ${props.underline && `text-decoration: underline;`}
            ${
              props.containIcon &&
              `
                & > svg {
                    fill: ${ColorPalette.Neutral.NEUTRAL_0};
                }
                `
            }
        }
    `}
`;

export default EPLink;
