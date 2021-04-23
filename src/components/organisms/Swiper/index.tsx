import React, { useCallback, useEffect, useState } from 'react';
import SlidePoster from 'components/molecules/SlidePoster';
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
import useAIndexState from 'hooks/useAIndexState';
import useAIndexDisptach from 'hooks/useAIndexDispatch';
import { ColorPalette } from 'models/color';
import { IShowProps } from 'models/types';
import { setWidth } from 'utils';
import Icon from 'Icon/Icon';

interface IProps {
  shows: Array<IShowProps>;
}

const Swiper: React.FC<IProps> = ({ shows }) => {
  const [imgSize, setImgSize] = useState<number>(0);
  const [tDuration, setTDuration] = useState(0);
  const [play, setPlay] = useState(true);

  const state = useAIndexState();
  const dispatch = useAIndexDisptach();

  useEffect(() => {
    setImgSize(setWidth());

    window.addEventListener('resize', () => {
      setTDuration(0);
      setImgSize(setWidth());
    });
    return () => {
      window.removeEventListener('resize', () => {
        setTDuration(0);
        setImgSize(setWidth());
      });
      setPlay(false);
    };
  }, []);

  const handlePrevSwipe = useCallback(() => {
    if (shows) {
      setTDuration(500);
      dispatch({ type: 'DECREASE_INDEX' });
      if (state.activeIndex === 1) {
        setTimeout(() => {
          setTDuration(0);
          dispatch({ type: 'SET_INDEX', index: 9 });
        }, 500);
      }
    }
  }, [state.activeIndex]);

  const handleNextSwipe = useCallback(() => {
    if (shows) {
      setTDuration(500);
      dispatch({ type: 'INCREASE_INDEX' });
      if (state.activeIndex === 9) {
        setTimeout(() => {
          setTDuration(0);
          dispatch({ type: 'SET_INDEX', index: 1 });
        }, 500);
      }
    }
  }, [state.activeIndex]);

  useInterval(handleNextSwipe, play ? 10000 : null);

  const handlePlay = useCallback(() => {
    if (play) {
      clearTimeout();
    }
    setPlay((prevState) => !prevState);
  }, []);

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
                ? imgSize * state.activeIndex + 17 * state.activeIndex
                : imgSize * state.activeIndex
            }px, 0)`,
            transitionDuration: `${tDuration}ms`,
          }}
        >
          <BackdropContainer>
            <DuplicateContainer style={{ width: imgSize }} />
          </BackdropContainer>
          {shows.map((show) => (
            <SlidePoster key={show.id} show={show} imgSize={imgSize} />
          ))}
          <SlidePoster show={shows[0]} imgSize={imgSize} />
        </SwiperWarpper>
        <Buttons>
          <DotContainer>
            {shows.map((v, i) => (
              <Dot key={i} active={i + 1 === state.activeIndex} />
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
