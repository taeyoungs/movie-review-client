import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useLazyQuery } from '@apollo/client';
import { HomeScrollSection, ScrollDiv } from 'pages/Home/WithEmotion';
import Loading from 'products/Loading';
import PosterCard from 'products/PosterCard';
import { TRENDING_MOVIES_QUERY, TRENDING_SHOWS_QUERY } from 'queries/Query';
import { ColorPalette } from 'models/color';

const ToggleBtn = styled.label`
  color: #000;
  background-color: #fff;
  border-radius: 20px;
  display: inline-flex;
  justify-content: space-around;
  margin: 0 10px;
  cursor: pointer;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 65px;
    height: 25px;
    background-color: ${ColorPalette.Main.CTA_PRIMARY};
    border-radius: 20px;
    z-index: 9;
  }
  &:nth-of-type(1) {
    margin-left: 30px;
  }
`;

const HiddenBox = styled.input`
  display: none;
`;

const ToggleText = styled.span`
  display: inline-block;
  font-size: 14px;
  padding: 8px 20px;
  font-weight: 300;
  z-index: 10;
`;

interface IShowProps {
  id: number;
  poster_path: string;
  name: string;
  overview: string;
  backdrop_path: string;
}

interface IMovieProps {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

const Trending: React.FunctionComponent = () => {
  const [mediaType, setMediaType] = useState(false);
  const [timeWindow, setTimeWindow] = useState('day');
  const [
    getTrendingMovies,
    { loading: movieLoading, data: movies },
  ] = useLazyQuery<{
    trendingMovies: Array<IMovieProps>;
  }>(TRENDING_MOVIES_QUERY);
  const [
    getTrendingShows,
    { loading: showLoading, data: shows },
  ] = useLazyQuery<{
    trendingShows: Array<IShowProps>;
  }>(TRENDING_SHOWS_QUERY);

  if ('IntersectionObserver' in window) {
    const trendingTitle = document.querySelector('.lazy');
    if (trendingTitle) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const trending = entry.target;
            trending.classList.remove('lazy');
            getTrendingMovies({ variables: { timeWindow } });
            imageObserver.unobserve(trendingTitle);
          }
        });
      });
      imageObserver.observe(trendingTitle);
    }
  }

  const handleMediaType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    setMediaType(checked);
    if (checked) {
      getTrendingShows({ variables: { timeWindow } });
    } else {
      getTrendingMovies({ variables: { timeWindow } });
    }
  };

  const handleTimeWindow = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.checked ? 'week' : 'day';

    setTimeWindow(type);
    if (mediaType) {
      getTrendingShows({ variables: { timeWindow: type } });
    } else {
      getTrendingMovies({ variables: { timeWindow: type } });
    }
  };

  return (
    <HomeScrollSection>
      <h2>
        <span className="lazy">트렌딩</span>
        <HiddenBox
          type="checkbox"
          name="media-type"
          id="media-type"
          onChange={handleMediaType}
        />
        <ToggleBtn htmlFor="media-type">
          <ToggleText>영화</ToggleText>
          <ToggleText>TV</ToggleText>
        </ToggleBtn>
        <HiddenBox
          type="checkbox"
          name="time-window"
          id="time-window"
          onChange={handleTimeWindow}
        />
        <ToggleBtn htmlFor="time-window">
          <ToggleText>오늘</ToggleText>
          <ToggleText>이번 주</ToggleText>
        </ToggleBtn>
      </h2>
      <ScrollDiv>
        {mediaType ? (
          showLoading ? (
            <Loading />
          ) : (
            shows &&
            shows.trendingShows.map((show) => (
              <PosterCard key={show.id} {...show} isDark />
            ))
          )
        ) : movieLoading ? (
          <Loading />
        ) : (
          movies &&
          movies.trendingMovies.map((movie) => (
            <PosterCard key={movie.id} {...movie} isDark />
          ))
        )}
      </ScrollDiv>
    </HomeScrollSection>
  );
};

export default Trending;
