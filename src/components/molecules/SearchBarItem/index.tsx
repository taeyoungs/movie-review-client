import React from 'react';
import P from 'components/atoms/P';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';
import {
  ContentContainer,
  ItemContainer,
  Poster,
  PosterContainer,
  RatingContainer,
  NoImgContainer,
} from './WithEmotion';
import { ISearchProps } from 'models/types';

// ToDo: Link

const SearchBarContent: React.FC<ISearchProps> = ({
  id,
  poster_path,
  profile_path,
  media_type,
  title,
  name,
  vote_average,
  release_date,
  first_air_date,
}) => {
  return (
    <ItemContainer>
      <PosterContainer>
        {poster_path || profile_path ? (
          <Poster
            imgPath={`https://image.tmdb.org/t/p/w220_and_h330_face${
              poster_path || profile_path
            }`}
          ></Poster>
        ) : (
          <NoImgContainer>
            <Icon icon="logo" size={50} />
          </NoImgContainer>
        )}
      </PosterContainer>
      <ContentContainer>
        <P color={ColorPalette.Neutral.NEUTRAL_0} weight={600} size={16}>
          {title || name}
        </P>
        {vote_average != null && (
          <RatingContainer>
            <Icon
              size={12}
              icon="star"
              color={ColorPalette.Yellow.YELLOW_600}
            />
            <P
              margin={[0, 0, 0, 3]}
              size={12}
              color={ColorPalette.Neutral.NEUTRAL_300}
            >
              {vote_average}
            </P>
          </RatingContainer>
        )}
        {(release_date || first_air_date) && (
          <P size={12} color={ColorPalette.Neutral.NEUTRAL_300}>
            {release_date || first_air_date || 'Preparing'}
          </P>
        )}
      </ContentContainer>
    </ItemContainer>
  );
};

export default SearchBarContent;
