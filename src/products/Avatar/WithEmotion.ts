import styled from '@emotion/styled';
import Card from 'components/molecules/Card';
import { ColorPalette } from 'models/color';
import { AvatarSize, IProps } from './index';

const Container = styled(Card)<IProps>`
  width: 28px;
  height: 28px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: ${ColorPalette.Yellow.YELLOW_400};
  text-transform: uppercase;
  color: ${ColorPalette.Neutral.NEUTRAL_1000};
  font-weight: 600;
  & > svg {
      width: 22px;
  }
  ${(props) =>
    props.size === AvatarSize.LARGE &&
    `
        width: 40px;
        height: 40px;
        font-size: 18px;
        & > svg {
            width: 34px;
        }
    `}
  ${(props) =>
    props.size === AvatarSize.SMALL &&
    `
        width: 20px;
        height: 20px;
        font-size: 12px;
        & > svg {
            width: 15px;
        }
    `}
  ${(props) =>
    props.size === AvatarSize.TINY &&
    `
        width: 16px;
        height: 16px;
        font-size: 10px;
        & > svg {
            width: 13px;
        }
    `}
  ${(props) =>
    props.isLoading &&
    `
        background: ${ColorPalette.Neutral.NEUTRAL_400};
        & > svg {
            position: relative;
            bottom: -2.5px;
        }
    `}
`;

// 402016

export { Container };
