import React from 'react';
import styled from '@emotion/styled';
import P from 'components/atoms/P';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';

export interface ISearchProps {
  id: number;
  poster_path?: string;
  profile_path?: string;
  media_type?: string;
  title?: string;
  name?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
}

// ToDo: Link

const ItemContainer = styled.li`
  width: 100%;
  display: flex;
  padding: 5px;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  box-sizing: border-box;
`;

const PosterContainer = styled.div`
  width: 4rem;
  min-width: 4rem;
  height: calc(4rem * 1.5);
`;

const Poster = styled.div<{ imgPath?: string }>`
  background: url(${(props) => props.imgPath});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

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
        <Poster
          imgPath={`https://image.tmdb.org/t/p/w220_and_h330_face${
            poster_path || profile_path
          }`}
        ></Poster>
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
