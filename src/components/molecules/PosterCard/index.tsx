import React from 'react';
import P from 'components/atoms/P';
import Link from 'components/molecules/Link';
import {
  Content,
  Poster,
  Rating,
  RBlock,
  PosterWrapper,
  PosterInner,
} from './WithEmotion';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';

export interface IProps {
  poster_path?: string;
  vote_average?: number;
  title?: string;
  release_date?: string;
  name?: string;
  first_air_date?: string;
  isDark?: boolean;
  href?: string;
  lazy?: boolean;
}

function formatDate(date: string): string {
  const [year, month, day] = date.split('-');

  return `${month}.${day} ${year}`;
}

const PosterCard: React.FC<IProps> = ({
  poster_path,
  vote_average = 4.2,
  title,
  release_date,
  isDark = false,
  href = '#',
  lazy = false,
  name,
  first_air_date,
}) => {
  return (
    <RBlock>
      <Link href={href}>
        <PosterWrapper>
          <PosterInner
            isDark={isDark}
            title={title || name || 'Youngs'}
            isPoster={poster_path ? true : false}
          >
            {lazy ? (
              <Poster
                data-src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                isDark={isDark}
                className="lazy"
                alt={title}
              ></Poster>
            ) : (
              <Poster
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                isDark={isDark}
                alt={title}
              ></Poster>
            )}
          </PosterInner>
        </PosterWrapper>
      </Link>
      <Content isDark={isDark}>
        <Rating isDark={isDark}>
          <Icon icon="star" color={ColorPalette.Yellow.YELLOW_600} size={22} />
          <P weight={600} margin={[0, 0, 0, 3]}>
            {vote_average}
          </P>
        </Rating>
        <P size={16} weight={600} margin={[15, 0, 5, 0]}>
          {!isDark ? (
            <Link isTitle href={href}>
              {title && title}
              {name && name}
            </Link>
          ) : (
            <Link secondary underline href={href}>
              {title && title}
              {name && name}
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
          {release_date && formatDate(release_date)}
          {first_air_date && formatDate(first_air_date)}
        </P>
      </Content>
    </RBlock>
  );
};

export default PosterCard;
