import React from 'react';
import { BackdropContainer } from 'pages/Home/WithEmotion';
import {
  Backdrop,
  GradientContainer,
  Info,
  Poster,
  Content,
} from './WithEmotion';

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
        <p>{name}</p>
        <p>
          {overview.length > 130 ? overview.slice(0, 130) + '...' : overview}
        </p>
      </Content>
    </BackdropContainer>
  );
};

export default SlidePoster;
