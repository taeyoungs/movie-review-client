import React from 'react';
import P from 'components/atoms/P';
import Icon from 'Icon/Icon';
import Link from 'products/Link';
import { Content, Poster, Rating, RBlock } from './WithEmotion';
import { ColorPalette } from 'models/color';

export interface IProps {
  posterPath?: string;
  voteAverage?: number;
  title?: string;
  releaseDate?: string;
  isDark?: boolean;
  href?: string;
}

const PosterCard: React.FC<IProps> = ({
  posterPath = 'https://image.tmdb.org/t/p/w220_and_h330_face/rCcL0gv0frDkGLktAbmaAsz7TX6.jpg',
  voteAverage = 4.2,
  title = '익스트랙션',
  releaseDate = '04.24 2020',
  isDark = false,
  href = '#',
}) => {
  return (
    <RBlock>
      <Link href={href}>
        <Poster posterPath={posterPath} isDark={isDark}></Poster>
      </Link>
      <Content isDark={isDark}>
        <Rating isDark={isDark}>
          <Icon icon="star" color={ColorPalette.Yellow.YELLOW_600} size={22} />
          <P weight={600} margin={[0, 0, 0, 3]}>
            {voteAverage}
          </P>
        </Rating>
        <P size={16} weight={600} margin={[10, 0, 5, 0]}>
          {!isDark ? (
            <Link isTitle href={href}>
              {title}
            </Link>
          ) : (
            <Link secondary underline href={href}>
              {title}
            </Link>
          )}
        </P>
        <P
          size={13}
          color={
            isDark
              ? ColorPalette.Neutral.NEUTRAL_300
              : ColorPalette.Neutral.NEUTRAL_600
          }
        >
          {releaseDate}
        </P>
      </Content>
    </RBlock>
  );
};

export default PosterCard;
