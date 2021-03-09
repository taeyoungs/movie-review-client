import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';
import { POPULAR_SHOWS_QUERY } from 'queries/Query';
import Button, { ButtonAppearance } from 'products/Button';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';

const Main = styled.main`
  min-height: 150vh;
  margin-top: 3.5rem;
`;

const Container = styled.article`
  width: 100%;
  margin: 0px;
  margin-top: 10px;
  @media (min-width: 1024px) {
    max-width: 1024px;
    margin: 0px auto;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
    margin: 0px auto;
  }
`;

const GridContainer = styled.div`
  display: grid;
  @media (min-width: 1024px) {
    grid-template-columns: calc(1024px / 3) calc(1024px / 3) calc(1024px / 3);
  }
  @media (min-width: 1280px) {
    grid-template-columns: calc(1280px / 3) calc(1280px / 3) calc(1280px / 3);
  }
`;

const MainPoster = styled.div`
  grid-column: span 1;
  @media (min-width: 1024px) {
    grid-column: span 2;
  }
  @media (min-width: 1280px) {
    grid-column: span 2;
  }
`;

// Slide 노출시킬 div
const SwiperContainer = styled.div`
  position: relative;
  margin-top: 10px;
  overflow: hidden;
  width: 100%;
  padding-bottom: 50px;
`;

// Slide 시킬 긴 flex div
const SwiperWarpper = styled.figure<{ activeIndex: number; prevIndex: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  transition-property: transform;
  transition-timing-function: ease-in-out;
`;

const BackdropContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-right: 17px;
  @media (min-width: 1024px) {
    margin-right: 0px;
  }
  @media (min-width: 1280px) {
    margin-right: 0px;
  }
`;

const DuplicateContainer = styled.div`
  background: black;
`;

const Backdrop = styled.img`
  object-fit: cover;
  display: flex;
  align-items: flex-end;
`;

const SlideContainer = styled.div`
  grid-column: span 1;
`;

const PrevArrowContainer = styled.div`
  position: absolute;
  top: 45%;
  transform: rotate3d(0, 1, 0, 180deg);
  left: 10px;
`;

const NextArrowContainer = styled.div`
  position: absolute;
  top: 45%;
  right: 10px;
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
  bottom: 0;
  left: 30%;
  color: white;
`;

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
  const [prevIndex, setPrevIndex] = useState(0);
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
      setActiveIndex((prevState) => {
        setPrevIndex(prevState);
        return prevState - 1;
      });
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
      setActiveIndex((prevState) => {
        setPrevIndex(prevState);
        return prevState + 1;
      });
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

  return (
    <Main role="main">
      <Container>
        <GridContainer>
          <MainPoster>
            <SwiperContainer style={{ width: imgSize }}>
              <SwiperWarpper
                activeIndex={activeIndex}
                prevIndex={prevIndex}
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
                      data.shows.slice(0, 9).map((show) => (
                        <BackdropContainer
                          key={show.id}
                          className="backdrop-container"
                        >
                          <Backdrop
                            src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`}
                            alt={`${show.name}`}
                            style={{ width: imgSize }}
                          />
                          <GradientContainer />
                          <Info>
                            <Poster
                              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                              alt={`${show.name}`}
                            />
                          </Info>
                          <Content>
                            <p>{show.name}</p>
                            <p>{show.overview}</p>
                          </Content>
                        </BackdropContainer>
                      ))}
                    {data && (
                      <BackdropContainer>
                        <Backdrop
                          src={`https://image.tmdb.org/t/p/original/${data.shows[0].backdrop_path}`}
                          alt={`${data.shows[0].name}`}
                          style={{ width: imgSize }}
                        />
                      </BackdropContainer>
                    )}
                  </>
                )}
              </SwiperWarpper>
              <PrevArrowContainer>
                <Button
                  appearance={ButtonAppearance.OUTLINE_PRIMARY}
                  onlyIcon={true}
                  onClick={handlePrevSwipe}
                >
                  <Icon
                    icon="arrowRight"
                    color={ColorPalette.Neutral.NEUTRAL_0}
                    size={24}
                  />
                </Button>
              </PrevArrowContainer>
              <NextArrowContainer>
                <Button
                  appearance={ButtonAppearance.OUTLINE_PRIMARY}
                  onlyIcon={true}
                  onClick={handleNextSwipe}
                >
                  <Icon
                    icon="arrowRight"
                    color={ColorPalette.Neutral.NEUTRAL_0}
                    size={24}
                  />
                </Button>
              </NextArrowContainer>
            </SwiperContainer>
          </MainPoster>
          <SlideContainer></SlideContainer>
        </GridContainer>
      </Container>
    </Main>
  );
};

export default Home;
