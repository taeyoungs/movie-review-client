import React from 'react';
import styled from '@emotion/styled';
import { EmptyStars, ColorStars } from './WithEmotion';
import Icon from 'Icon/Icon';
import { ColorPalette } from 'models/color';

// ToDo: 1. hover 2. without hover

export interface IProps {
  rating?: number;
  tempRating?: number;
  isHover?: boolean;
  handleMouseOver?(i: number): void;
  handleClick?(i: number): void;
  handleMouseOut?(): void;
}

function calculateStar(rating: number): number {
  const roundedRating = parseFloat(rating.toFixed(1));

  if (roundedRating > 0 && roundedRating <= 1) {
    return 10;
  } else if (roundedRating > 1 && roundedRating <= 2) {
    return 20;
  } else if (roundedRating > 2 && roundedRating <= 3) {
    return 30;
  } else if (roundedRating > 3 && roundedRating <= 4) {
    return 40;
  } else if (roundedRating > 4 && roundedRating <= 5) {
    return 50;
  } else if (roundedRating > 5 && roundedRating <= 6) {
    return 60;
  } else if (roundedRating > 6 && roundedRating <= 7) {
    return 70;
  } else if (roundedRating > 7 && roundedRating <= 8) {
    return 80;
  } else if (roundedRating > 8 && roundedRating <= 9) {
    return 90;
  } else if (roundedRating > 9 && roundedRating <= 10) {
    return 100;
  } else {
    return 0;
  }
}

const HalfS = styled.div<{ reverse?: boolean }>`
  display: inline-block;
  overflow: hidden;
  width: 10px;
  ${(props) =>
    props.reverse &&
    `
    direction: rtl;
    `}
`;

const RatedStar: React.FC<IProps> = ({
  rating = 0,
  isHover = false,
  handleMouseOver,
  handleMouseOut,
  handleClick,
}) => {
  const stars = [];
  for (let i = 1; i <= 10; i++) {
    const rev = i % 2 == 0;
    stars.push(
      <HalfS
        reverse={rev}
        onMouseOver={() => handleMouseOver && handleMouseOver(i)}
        onClick={() => handleClick && handleClick(i)}
      >
        <Icon icon="star" size={20} color={ColorPalette.Neutral.NEUTRAL_300} />
      </HalfS>
    );
  }

  const starss = [];
  for (let i = 1; i <= 10; i++) {
    const rev = i % 2 == 0;
    starss.push(
      <HalfS
        reverse={rev}
        onMouseOver={() => handleMouseOver && handleMouseOver(i)}
        onClick={() => handleClick && handleClick(i)}
        onMouseOut={() => handleMouseOut && handleMouseOut()}
      >
        <Icon icon="star" size={20} color={ColorPalette.Yellow.YELLOW_600} />
      </HalfS>
    );
  }

  return (
    <EmptyStars isHover={isHover}>
      {stars}
      <ColorStars w={calculateStar(rating)}>{starss}</ColorStars>
    </EmptyStars>
  );
};

export default RatedStar;
