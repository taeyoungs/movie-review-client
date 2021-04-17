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
import { Link } from 'react-router-dom';

// ToDo: Link

interface IProps {
  multiSearch: ISearchProps;
}

const ResultContent: React.FC<IProps> = ({ multiSearch }) => {
  return (
    <Link to={`/${multiSearch.media_type}/${multiSearch.id}`}>
      <ItemContainer>
        <PosterContainer>
          {multiSearch.poster_path ? (
            <Poster imgPath={multiSearch.poster_path}></Poster>
          ) : (
            <NoImgContainer>
              <Icon icon="logo" size={50} />
            </NoImgContainer>
          )}
        </PosterContainer>
        <ContentContainer>
          <P color={ColorPalette.Neutral.NEUTRAL_0} weight={600} size={16}>
            {multiSearch.title}
          </P>
          {(multiSearch.media_type === 'movie' ||
            multiSearch.media_type === 'tv') && (
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
                {multiSearch.vote_average ? multiSearch.vote_average : 0}
              </P>
            </RatingContainer>
          )}
          {multiSearch.release_date && (
            <P size={12} color={ColorPalette.Neutral.NEUTRAL_300}>
              {multiSearch.release_date || 'Preparing'}
            </P>
          )}
        </ContentContainer>
      </ItemContainer>
    </Link>
  );
};

export default ResultContent;
