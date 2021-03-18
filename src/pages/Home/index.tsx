import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';
import { POPULAR_MOVIES_QUERY, POPULAR_SHOWS_QUERY } from 'queries/Query';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';
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
import useInterval from 'hooks/useInterval';

const HomeScrollSection = styled.section`
  width: 100%;
  padding-top: 15px;
  margin: 0px 0px 20px 30px;
  @media (min-width: 1024px) {
    max-width: 1024px;
    margin: 0px auto 20px;
    padding-top: 20px;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
    margin: 0px auto 20px;
    padding-top: 20px;
    margin-left: 30px;
  }
  & h2 {
    color: #f1c40f;
    font-size: 25px;
    margin: 20px 0px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
`;

const ScrollDiv = styled.div`
  padding: 20px 0px 40px;
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

const Buttons = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const DotContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Dot = styled.div<{ active: boolean }>`
  display: inline-block;
  width: ${(props) => (props.active ? '20px' : '7px')};
  height: 7px;
  background-color: ${(props) =>
    props.active ? ColorPalette.Main.CTA_PRIMARY : '#fff'};
  border-radius: 20px;
  margin: 0 5px;
  transition: width 0.5s;
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 110px;
  height: 30px;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 auto;
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
  const [play, setPlay] = useState(true);
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

  useInterval(handleNextSwipe, play ? 5000 : null);

  const handlePlay = () => {
    if (play) {
      clearTimeout();
    }
    setPlay((prevState) => !prevState);
  };

  window.addEventListener('resize', () => {
    setTDuration(0);
    setImgSize(setWidth());
  });

  const mediaType = document.getElementById('media-type');
  const timeWindow = document.getElementById('time-window');

  const Arrow: React.FC<{ next?: boolean; pause?: boolean }> = ({
    next = false,
    pause = false,
  }) => {
    return (
      <ArrowBtn
        next={next}
        onClick={next ? handlePrevSwipe : pause ? handlePlay : handleNextSwipe}
      >
        {pause ? (
          <Icon
            icon={play ? 'pause' : 'play'}
            color={ColorPalette.Neutral.NEUTRAL_900}
            size={13}
          />
        ) : (
          <Icon
            icon="arrowRight"
            color={ColorPalette.Neutral.NEUTRAL_900}
            size={13}
          />
        )}
      </ArrowBtn>
    );
  };

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
                  <BackdropContainer>
                    <DuplicateContainer style={{ width: imgSize }} />
                  </BackdropContainer>
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
              <Buttons>
                <DotContainer>
                  {showData &&
                    showData.shows
                      .slice(0, 9)
                      .map((v, i) => (
                        <Dot key={i} active={i + 1 === activeIndex} />
                      ))}
                </DotContainer>
                <ArrowContainer>
                  <Arrow next />
                  <Arrow pause />
                  <Arrow />
                </ArrowContainer>
              </Buttons>
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
      <HomeScrollSection>
        <h2>박스오피스</h2>
        <ScrollDiv>
          {movieData &&
            movieData.movies.map((movie) => (
              <PosterCard key={movie.id} {...movie} isDark />
            ))}
        </ScrollDiv>
      </HomeScrollSection>
      <HomeScrollSection>
        <h2>
          <span>트렌딩</span>
          <HiddenBox type="checkbox" name="media-type" id="media-type" />
          <ToggleBtn htmlFor="media-type">
            <ToggleText>영화</ToggleText>
            <ToggleText>TV</ToggleText>
          </ToggleBtn>
          <HiddenBox type="checkbox" name="time-window" id="time-window" />
          <ToggleBtn htmlFor="time-window">
            <ToggleText>오늘</ToggleText>
            <ToggleText>이번 주</ToggleText>
          </ToggleBtn>
        </h2>
        <ScrollDiv>
          {movieData &&
            movieData.movies.map((movie) => (
              <PosterCard key={movie.id} {...movie} isDark />
            ))}
        </ScrollDiv>
      </HomeScrollSection>
    </Main>
  );
};

export default Home;
