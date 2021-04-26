import React from 'react';
import { Link } from 'react-router-dom';
import { BackdropContainer } from 'pages/Home/WithEmotion';
import {
  Backdrop,
  GradientContainer,
  Info,
  Poster,
  Content,
} from './WithEmotion';
import styled from '@emotion/styled';
import { IMovieProps } from 'models/types';

const PosterOverview = styled.div`
  line-height: 20px;
  letter-spacing: -0.5px;
  font-size: 14px;
  color: #d3d3d3;
  white-space: pre-wrap;
  word-break: break-all;
`;

const ELink = styled(Link)`
  &:hover {
    .poster-title {
      color: #f1c40f;
    }
  }
`;

interface IProps {
  show: IMovieProps;
  imgSize: number;
}

const SlidePoster: React.FC<IProps> = ({ show, imgSize }) => {
  return (
    <ELink to={`/tv/${show.id}`}>
      <BackdropContainer className="backdrop-container">
        <Backdrop
          src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`}
          alt={show.title}
          style={{ width: imgSize }}
        />
        <GradientContainer />
        <Info>
          <Poster
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            alt={show.title}
          />
        </Info>
        <Content>
          <p className="poster-title">{show.title}</p>
          <PosterOverview>
            {show.overview.length > 130
              ? show.overview.slice(0, 130) + '...'
              : show.overview}
          </PosterOverview>
        </Content>
      </BackdropContainer>
    </ELink>
  );
};

export default React.memo(SlidePoster);
