import React from 'react';
import styled from '@emotion/styled';
import P from 'components/atoms/P';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';

export interface IProps {
  posterPath?: string;
  voteAverage?: number;
  title?: string;
  releaseDate?: string;
  withDark?: boolean;
}

// ToDo: With border / Without border

const RBlock = styled.div<{ withDark: boolean }>`
  box-sizing: border-box;
  width: 180px;
  min-width: 180px;
  ${(props) =>
    props.withDark &&
    `
    border-radius: 10px;
    `}
`;

const Poster = styled.div<{ posterPath: string }>`
  width: 100%;
  height: calc(180px * 1.5);
  background-image: url(${(props) => props.posterPath});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Rating = styled.div`
  background: ${ColorPalette.Neutral.NEUTRAL_0};
  border-radius: 50px;
  position: absolute;
  top: -10px;
  padding: 4px 4px 4px 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  padding: 10px 6px 6px 10px;
  position: relative;
`;

// ToDo: Title => Link로 변경
const PosterCard: React.FC<IProps> = ({
  posterPath = 'https://image.tmdb.org/t/p/w220_and_h330_face/rCcL0gv0frDkGLktAbmaAsz7TX6.jpg',
  voteAverage = 4.2,
  title = '익스트랙션',
  releaseDate = '04.24 2020',
  withDark = false,
}) => {
  return (
    <RBlock withDark={withDark}>
      <Poster posterPath={posterPath}></Poster>

      <Content>
        <Rating>
          <Icon icon="star" color={ColorPalette.Yellow.YELLOW_600} size={22} />
          <P weight={600} margin={[0, 0, 0, 3]}>
            {voteAverage}
          </P>
        </Rating>
        <P
          size={16}
          weight={600}
          margin={[10, 0, 5, 0]}
          color={ColorPalette.Neutral.NEUTRAL_0}
        >
          {title}
        </P>
        <P size={13} color={ColorPalette.Neutral.NEUTRAL_300}>
          {releaseDate}
        </P>
      </Content>
    </RBlock>
  );
};

export default PosterCard;
