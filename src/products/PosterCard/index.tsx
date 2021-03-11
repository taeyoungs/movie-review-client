import React from 'react';
import P from 'components/atoms/P';
import Icon from 'Icon/Icon';
import Link from 'products/Link';
import { Content, Poster, Rating, RBlock } from './WithEmotion';
import { ColorPalette } from 'models/color';

export interface IProps {
  poster_path?: string;
  vote_average?: number;
  title?: string;
  release_date?: string;
  isDark?: boolean;
  href?: string;
}

function formatDate(date: string): string {
  const [year, month, day] = date.split('-');

  return `${month}.${day} ${year}`;
}

const PosterCard: React.FC<IProps> = ({
  poster_path = 'https://image.tmdb.org/t/p/w220_and_h330_face/rCcL0gv0frDkGLktAbmaAsz7TX6.jpg',
  vote_average = 4.2,
  title = '익스트랙션',
  release_date = '04.24 2020',
  isDark = false,
  href = '#',
}) => {
  return (
    <RBlock>
      <Link href={href}>
        <Poster
          posterPath={`https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`}
          isDark={isDark}
        ></Poster>
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
          {formatDate(release_date)}
        </P>
      </Content>
    </RBlock>
  );
};

export default PosterCard;
