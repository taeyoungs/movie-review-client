import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { POPULAR_SHOWS_QUERY } from 'queries/Query';
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

interface IShowProps {
  id: number;
  poster_path: string;
  name: string;
  overview: string;
  backdrop_path: string;
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
  const { loading, data } = useQuery<{ shows: Array<IShowProps> }>(
    POPULAR_SHOWS_QUERY,
    {
      variables: { page: 1 },
    }
  );

  const handlePrevSwipe = () => {
    if (data) {
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
    if (data) {
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
                {loading ? (
                  <div>loading...</div>
                ) : (
                  <>
                    <BackdropContainer>
                      <DuplicateContainer style={{ width: imgSize }} />
                    </BackdropContainer>
                    {data &&
                      data.shows
                        .slice(0, 9)
                        .map((show) => (
                          <SlidePoster {...show} imgSize={imgSize} />
                        ))}
                    {data && (
                      <SlidePoster {...data.shows[0]} imgSize={imgSize} />
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
                {data &&
                  data.shows
                    .slice(activeIndex, 9)
                    .map((item) => <Up {...item} />)}
                {data &&
                  data.shows
                    .slice(0, activeIndex)
                    .map((item) => <Up {...item} />)}
              </div>
            </UpNext>
          </SlideContainer>
        </GridContainer>
      </Container>
    </Main>
  );
};

export default Home;
