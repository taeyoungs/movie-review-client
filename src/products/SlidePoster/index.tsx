import React from 'react';
import styled from '@emotion/styled';
import { BackdropContainer } from 'pages/Home/WithEmotion';

const Backdrop = styled.img`
  object-fit: cover;
  display: flex;
  align-items: flex-end;
`;

const GradientContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, black, transparent 40%);
  z-index: 9;
`;

const Info = styled.div`
  position: absolute;
  z-index: 10;
  bottom: -15%;
`;

const Poster = styled.img`
  margin-left: 30px;
  z-index: 10;
  width: 18vw;
  @media (min-width: 1024px) {
    width: 11vw;
    height: calc(11vw * 1.5);
  }
`;

const Content = styled.figcaption`
  position: absolute;
  z-index: 10;
  bottom: -15px;
  left: 30%;
  color: white;
  & p:nth-of-type(1) {
    font-size: 30px;
    margin-bottom: 10px;
  }
  & p:nth-of-type(2) {
    line-height: 20px;
    font-size: 14px;
    color: lightgrey;
    margin-right: 30px;
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
