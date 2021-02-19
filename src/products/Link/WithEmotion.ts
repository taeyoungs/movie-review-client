import styled from '@emotion/styled';
import A from 'components/molecules/A';
import { ColorPalette } from 'models/color';
import { IProps } from '.';

const EPLink = styled(A)<IProps>`
  color: ${ColorPalette.Main.CTA_PRIMARY};
  text-decoration: none;
  &:hover {
    color: ${ColorPalette.Yellow.YELLOW_600};
    ${(props) => props.underline && `text-decoration: underline;`}
  }
  ${(props) =>
    props.isTitle &&
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
