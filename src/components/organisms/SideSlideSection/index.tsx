import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import UpNextItem from 'components/molecules/UpNextItem';
import { IMovieProps } from 'models/types';
import { ColorPalette } from 'models/color';
import { SlideContainer, UpNext } from './WithEmotion';
import useAIndexState from 'hooks/useAIndexState';

const SlideInner = styled.div`
  position: absolute;
  inset: 0px;
  overflow: hidden;
  background: linear-gradient(
    0deg,
    transparent 0%,
    transparent 50%,
    rgba(18, 18, 18, 0.7) 78%,
    rgb(18, 18, 18) 100%
  );
`;

const ContainerTitle = styled.h2`
  color: ${ColorPalette.Main.CTA_PRIMARY};
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 20px;
  margin: 10px 0 20px;
  padding: 0 16px;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

interface IProps {
  shows: IMovieProps[];
}

const SideSlideSection: React.FC<IProps> = ({ shows }) => {
  const [slideShows, setSlideShows] = useState(shows);
  const state = useAIndexState();

  useEffect(() => {
    setSlideShows([
      ...shows.slice(state.activeIndex, 9),
      ...shows.slice(0, state.activeIndex),
    ]);
  }, [state.activeIndex]);

  return (
    <SlideContainer>
      <ContainerTitle className="slide-title">Up next</ContainerTitle>
      <UpNext className="up-next">
        <SlideInner>
          <Slide className="up-next--list">
            {slideShows.map((show) => (
              <UpNextItem key={show.id} show={show} />
            ))}
          </Slide>
        </SlideInner>
      </UpNext>
    </SlideContainer>
  );
};

export default SideSlideSection;
