import React from 'react';
import {
  SlideContainer,
  UpNextItem,
  UpNext,
  UpNextPoster,
} from './WithEmotion';
import { IShowProps } from 'models/types';
import P from 'components/atoms/P';

interface IProps {
  activeIndex: number;
  shows: Array<IShowProps>;
}

const SideSlideSection: React.FC<IProps> = ({ activeIndex, shows }) => {
  const Up: React.FC<IShowProps> = ({ id, poster_path, name }) => {
    return (
      <UpNextItem key={id}>
        <UpNextPoster
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={name}
        />
        <figcaption>
          <P>{name}</P>
          <P>Go to Detail Page</P>
        </figcaption>
      </UpNextItem>
    );
  };
  return (
    <SlideContainer>
      <h2 className="slide-title">Up next</h2>
      <UpNext className="up-next">
        <div>
          {shows.slice(activeIndex, 9).map((item) => (
            <Up key={item.id} {...item} />
          ))}
          {shows.slice(0, activeIndex).map((item) => (
            <Up key={item.id} {...item} />
          ))}
        </div>
      </UpNext>
    </SlideContainer>
  );
};

export default SideSlideSection;
