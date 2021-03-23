import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Main,
  Container,
  GridContainer,
  SlideContainer,
  UpNextItem,
  UpNext,
  UpNextPoster,
  HomeScrollSection,
  ScrollDiv,
} from './WithEmotion';
import PosterCard from 'components/molecules/PosterCard';
import TrendingSection from 'components/organisms/TrendingSection';
import Swiper from 'components/organisms/Swiper';
import Loading from 'products/Loading';
import { POPULAR_MOVIES_QUERY, POPULAR_SHOWS_QUERY } from 'queries/Query';
import { IMovieProps, IShowProps } from 'models/types';

const Home: React.FunctionComponent = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { loading: showLoading, data: showData } = useQuery<{
    shows: Array<IShowProps>;
  }>(POPULAR_SHOWS_QUERY, {
    variables: { page: 1 },
  });
  const { loading: movieLoading, data: movieData } = useQuery<{
    movies: Array<IMovieProps>;
  }>(POPULAR_MOVIES_QUERY, {
    variables: { page: 1 },
  });

  const Up: React.FC<IShowProps> = ({ id, poster_path, name }) => {
    return (
      <UpNextItem key={id}>
        <UpNextPoster
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={name}
        />
        <figcaption>
          <p>{name}</p>
          <p>Go to Detail Page</p>
        </figcaption>
      </UpNextItem>
    );
  };

  return (
    <Main role="main">
      <Container>
        <GridContainer>
          {showLoading ? (
            <Loading />
          ) : (
            showData &&
            showData.shows && (
              <Swiper
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                shows={showData.shows}
              />
            )
          )}
          <SlideContainer>
            <h2 className="slide-title">Up next</h2>
            <UpNext className="up-next">
              <div>
                {showData &&
                  showData.shows
                    .slice(activeIndex, 9)
                    .map((item) => <Up key={item.id} {...item} />)}
                {showData &&
                  showData.shows
                    .slice(0, activeIndex)
                    .map((item) => <Up key={item.id} {...item} />)}
              </div>
            </UpNext>
          </SlideContainer>
        </GridContainer>
      </Container>
      <HomeScrollSection>
        <h2>박스오피스</h2>
        <ScrollDiv>
          {movieData &&
            movieData.movies.map((movie) => (
              <PosterCard key={movie.id} {...movie} isDark />
            ))}
        </ScrollDiv>
      </HomeScrollSection>
      <TrendingSection />
    </Main>
  );
};

export default Home;
