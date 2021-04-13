import React from 'react';
import { BackdropContainer } from 'pages/Home/WithEmotion';
import {
  Backdrop,
  GradientContainer,
  Info,
  Poster,
  Content,
} from './WithEmotion';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

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
  id: number;
  poster_path: string;
  name: string;
  overview: string;
  backdrop_path: string;
  imgSize: number;
}

const SlidePoster: React.FC<IProps> = ({
  id,
  poster_path,
  name,
  overview,
  backdrop_path,
  imgSize,
}) => {
  return (
    <ELink to={`/tv/${id}`}>
      <BackdropContainer key={id} className="backdrop-container">
        <Backdrop
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt={name}
          style={{ width: imgSize }}
        />
        <GradientContainer />
        <Info>
          <Poster
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={name}
          />
        </Info>
        <Content>
          <p className="poster-title">{name}</p>
          <PosterOverview>
            {overview.length > 130 ? overview.slice(0, 130) + '...' : overview}
          </PosterOverview>
        </Content>
      </BackdropContainer>
    </ELink>
  );
};

export default SlidePoster;
