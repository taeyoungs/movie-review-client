import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { HomeScrollSection, ScrollDiv } from 'pages/Home/WithEmotion';
import Loading from 'products/Loading';
import PosterCard from 'components/molecules/PosterCard';
import { TRENDING_MOVIES_QUERY, TRENDING_SHOWS_QUERY } from 'queries/Query';
import { IMovieProps, IShowProps } from 'models/types';
import { HiddenBox, ToggleBtn, ToggleText } from './WithEmotion';

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

  useEffect(() => {
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
  }, []);

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
              <PosterCard
                key={show.id}
                {...show}
                isDark
                href={`/tv/${show.id}`}
              />
            ))
          )
        ) : movieLoading ? (
          <Loading />
        ) : (
          movies &&
          movies.trendingMovies.map((movie) => (
            <PosterCard
              key={movie.id}
              {...movie}
              isDark
              href={`/movie/${movie.id}`}
            />
          ))
        )}
      </ScrollDiv>
    </HomeScrollSection>
  );
};

export default Trending;
