import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import {
  SlideContainer,
  UpNextItem,
  UpNext,
  UpNextPoster,
} from './WithEmotion';
import P from 'components/atoms/P';
import { POPULAR_SHOWS_QUERY } from 'queries/Query';
import { IShowProps } from 'models/types';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';

const SlideInner = styled.div`
  position: absolute;
  inset: 0px;
  overflow: hidden;
  background: linear-gradient(
    0deg,
    transparent 0%,
    transparent 50%,
    rgba(18, 18, 18, 0.7) 78%,
    rgb(18, 18, 18) 100%
  );
`;

const ContainerTitle = styled.h2`
  color: ${ColorPalette.Main.CTA_PRIMARY};
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 20px;
  margin: 10px 0 20px;
  padding: 0 16px;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const VideoButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 8px;
  margin-bottom: 5px;
`;

const VideoButton = styled.div`
  border: 3px solid #fff;
  border-radius: 50%;
  padding: 4px 4px 2px 7px;
  display: flex;
  transition: 200ms;
`;

const Fig = styled.figcaption`
  width: 100%;
  &:hover {
    & .video-button svg {
      fill: #f1c40f;
    }
    & .video-button {
      border-color: #f1c40f;
    }
  }
`;

const VideoNotfi = styled.span`
  color: #fff;
  font-size: 13px;
  color: #808080;
  margin: 0 0 0 10px;
`;

const PosterContainer = styled.div`
  padding: 10px 0 0;
  margin-right: 10px;
  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    width: 70px;
  }
  @media (min-width: 1280px) {
    width: 95px;
  }
`;

const PosterPadding = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &::before {
    content: '';
    display: block;
    padding-bottom: 148%;
    width: 100%;
    height: 0;
  }
`;

const ELink = styled(Link)`
  position: absolute;
  left: 115px;
  top: 0;
  right: 0;
  padding: 18px 8px 0;
  overflow: hidden;
  @media screen and (min-width: 1024px) and (max-width: 1279px) {
    left: 92px;
  }
`;

interface IProps {
  activeIndex: number;
}

const SideSlideSection: React.FC<IProps> = ({ activeIndex }) => {
  const { data } = useQuery<{
    shows: Array<IShowProps>;
  }>(POPULAR_SHOWS_QUERY, {
    variables: { page: 1 },
    fetchPolicy: 'cache-only',
  });

  const Up: React.FC<IShowProps> = ({ id, poster_path, name, overview }) => {
    return (
      <UpNextItem key={id}>
        <PosterContainer>
          <PosterPadding>
            <UpNextPoster
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={name}
            />
          </PosterPadding>
        </PosterContainer>
        <ELink to={`/tv/${id}`}>
          <Fig>
            <VideoButtonContainer>
              <VideoButton className="video-button">
                <Icon icon="play" color="#fff" size={18} />
              </VideoButton>
              <VideoNotfi>예고편</VideoNotfi>
            </VideoButtonContainer>
            <P>{name}</P>
            <P ellipsis color={ColorPalette.Neutral.NEUTRAL_200} size={13}>
              {overview}
            </P>
          </Fig>
        </ELink>
      </UpNextItem>
    );
  };
  return (
    <SlideContainer>
      <ContainerTitle className="slide-title">Up next</ContainerTitle>
      <UpNext className="up-next">
        <SlideInner>
          <Slide className="up-next--list">
            {data?.shows.slice(activeIndex, 9).map((item) => (
              <Up key={item.id} {...item} />
            ))}
            {data?.shows.slice(0, activeIndex).map((item) => (
              <Up key={item.id} {...item} />
            ))}
          </Slide>
        </SlideInner>
      </UpNext>
    </SlideContainer>
  );
};

export default SideSlideSection;
