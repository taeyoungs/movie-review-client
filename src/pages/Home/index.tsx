import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';
import { POPULAR_MOVIES_QUERY, POPULAR_SHOWS_QUERY } from 'queries/Query';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';
import Button, { ButtonAppearance } from 'products/Button';
import SlidePoster from 'products/SlidePoster';
import {
  Main,
  Container,
  GridContainer,
  MainPoster,
  SwiperContainer,
  SwiperWarpper,
  BackdropContainer,
  DuplicateContainer,
  SlideContainer,
  ArrowBtn,
  UpNextItem,
  UpNext,
  UpNextPoster,
} from './WithEmotion';
import PosterCard from 'products/PosterCard';

const PopularMovieSection = styled.section`
  width: 100%;
  margin: 0px;
  padding-top: 15px;
  margin-left: 30px;
  @media (min-width: 1024px) {
    max-width: 1024px;
    margin: 0px auto;
    padding-top: 20px;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
    margin: 0px auto;
    padding-top: 20px;
  }
  & h2 {
    color: #f1c40f;
    font-size: 25px;
    margin: 20px 0px;
    font-weight: 600;
  }
`;

const MovieScroll = styled.div`
  padding-top: 20px;
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #f1c40f;
    border-radius: 10px;
    width: ;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
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

// ToDo: useQuery
// poster link

function setWidth() {
  const width = window.innerWidth;
  if (width >= 1280) {
    return (1280 / 3) * 2;
  } else if (width >= 1024) {
    return (1024 / 3) * 2;
  } else {
    return width - 17;
  }
}

const Home: React.FunctionComponent = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [imgSize, setImgSize] = useState<number>(setWidth());
  const [tDuration, setTDuration] = useState(0);
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

  const handlePrevSwipe = () => {
    if (showData) {
      setTDuration(300);
      setActiveIndex((prevState) => prevState - 1);
      if (activeIndex === 1) {
        setTimeout(() => {
          setTDuration(0);
          setActiveIndex(9);
        }, 500);
      }
    }
  };

  const handleNextSwipe = () => {
    if (showData) {
      setTDuration(300);
      setActiveIndex((prevState) => prevState + 1);
      if (activeIndex === 9) {
        setTimeout(() => {
          setTDuration(0);
          setActiveIndex(1);
        }, 500);
      }
    }
  };

  window.addEventListener('resize', () => {
    setTDuration(0);
    setImgSize(setWidth());
  });

  const ArrowContainer: React.FC<{ next?: boolean }> = ({ next = false }) => {
    return (
      <ArrowBtn next={next}>
        <Button
          appearance={ButtonAppearance.OUTLINE_PRIMARY}
          onlyIcon={true}
          onClick={next ? handleNextSwipe : handlePrevSwipe}
        >
          <Icon
            icon="arrowRight"
            color={ColorPalette.Neutral.NEUTRAL_0}
            size={24}
          />
        </Button>
      </ArrowBtn>
    );
  };

  const Up: React.FC<IShowProps> = ({ id, poster_path, name }) => {
    return (
      <UpNextItem key={id}>
        <UpNextPoster
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={`${name}`}
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
          <MainPoster>
            <SwiperContainer style={{ width: imgSize }}>
              <SwiperWarpper
                className="swiper-wrapper"
                style={{
                  transform: `translate(-${
                    window.innerWidth < 1024
                      ? imgSize * activeIndex + 17 * activeIndex
                      : imgSize * activeIndex
                  }px, 0)`,
                  transitionDuration: `${tDuration}ms`,
                }}
              >
                {showLoading ? (
                  <div>loading...</div>
                ) : (
                  <>
                    <BackdropContainer>
                      <DuplicateContainer style={{ width: imgSize }} />
                    </BackdropContainer>
                    {showData &&
                      showData.shows
                        .slice(0, 9)
                        .map((show) => (
                          <SlidePoster
                            key={show.id}
                            {...show}
                            imgSize={imgSize}
                          />
                        ))}
                    {showData && (
                      <SlidePoster {...showData.shows[0]} imgSize={imgSize} />
                    )}
                  </>
                )}
              </SwiperWarpper>
              <ArrowContainer />
              <ArrowContainer next />
            </SwiperContainer>
          </MainPoster>
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
      <PopularMovieSection>
        <h2>박스오피스</h2>
        <MovieScroll>
          {movieData &&
            movieData.movies.map((movie) => (
              <PosterCard key={movie.id} {...movie} isDark />
            ))}
        </MovieScroll>
      </PopularMovieSection>
    </Main>
  );
};

export default Home;
