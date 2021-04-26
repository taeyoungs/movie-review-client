import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';
import { IMovieProps } from 'models/types';
import P from 'components/atoms/P';
import Icon from 'Icon/Icon';

const UpNext = styled.figure`
  display: flex;
  padding: 0 16px;
  width: 100%;
  flex: 0 0 148px;
  overflow: hidden;
  position: relative;
  & figcaption p:nth-of-type(1) {
    color: white;
    margin-bottom: 10px;
    font-size: 16px;
  }
  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    flex: 0 0 113px;
  }
`;

const UpNextPoster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
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
  show: IMovieProps;
}

function UpNextItem({ show }: IProps): JSX.Element {
  return (
    <UpNext>
      <PosterContainer>
        <PosterPadding>
          <UpNextPoster
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            alt={show.title}
          />
        </PosterPadding>
      </PosterContainer>
      <ELink to={`/tv/${show.id}`}>
        <Fig>
          <VideoButtonContainer>
            <VideoButton className="video-button">
              <Icon icon="play" color="#fff" size={18} />
            </VideoButton>
            <VideoNotfi>예고편</VideoNotfi>
          </VideoButtonContainer>
          <P>{show.title}</P>
          <P ellipsis color={ColorPalette.Neutral.NEUTRAL_200} size={13}>
            {show.overview}
          </P>
        </Fig>
      </ELink>
    </UpNext>
  );
}

export default React.memo(UpNextItem);
