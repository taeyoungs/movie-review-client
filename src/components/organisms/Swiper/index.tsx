import React, { useState } from 'react';
import SlidePoster from 'components/molecules/SlidePoster';
import Icon from 'Icon/Icon';
import {
  MainPoster,
  SwiperContainer,
  SwiperWarpper,
  BackdropContainer,
  DuplicateContainer,
  ArrowBtn,
  Buttons,
  DotContainer,
  Dot,
  ArrowContainer,
} from './WithEmotion';
import useInterval from 'hooks/useInterval';
import { ColorPalette } from 'models/color';
import { IShowProps } from 'models/types';
import { setWidth } from 'utils';

interface IProps {
  shows: Array<IShowProps>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Swiper: React.FC<IProps> = ({ shows, setActiveIndex, activeIndex }) => {
  const [imgSize, setImgSize] = useState<number>(setWidth());
  const [tDuration, setTDuration] = useState(0);
  const [play, setPlay] = useState(true);
  const handlePrevSwipe = () => {
    if (shows) {
      setTDuration(500);
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
    if (shows) {
      setTDuration(500);
      setActiveIndex((prevState) => prevState + 1);
      if (activeIndex === 9) {
        setTimeout(() => {
          setTDuration(0);
          setActiveIndex(1);
        }, 500);
      }
    }
  };

  useInterval(handleNextSwipe, play ? 10000 : null);

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
  return (
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
          <BackdropContainer>
            <DuplicateContainer style={{ width: imgSize }} />
          </BackdropContainer>
          {shows.slice(0, 9).map((show) => (
            <SlidePoster key={show.id} {...show} imgSize={imgSize} />
          ))}
          <SlidePoster {...shows[0]} imgSize={imgSize} />
        </SwiperWarpper>
        <Buttons>
          <DotContainer>
            {shows.slice(0, 9).map((v, i) => (
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
  );
};

export default Swiper;
