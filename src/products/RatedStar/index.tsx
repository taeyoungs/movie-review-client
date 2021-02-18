import React, { useState } from 'react';
import { EmptyStars, ColorStars, HalfStar } from './WithEmotion';
import Icon from 'Icon/Icon';
import { ColorPalette } from 'models/color';

export interface IProps {
  rating?: number;
  isHover?: boolean;
  handleClick?(i: number): void;
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

const RatedStar: React.FC<IProps> = ({
  rating = 0,
  isHover = false,
  handleClick,
}) => {
  const [tempRating, setTempRating] = useState(0);
  const emptyStars = [];
  for (let i = 1; i <= 10; i++) {
    const rev = i % 2 == 0;
    emptyStars.push(
      <HalfStar reverse={rev} onMouseOver={() => setTempRating(i)}>
        <Icon icon="star" size={20} color={ColorPalette.Neutral.NEUTRAL_300} />
      </HalfStar>
    );
  }

  const colorStars = [];
  for (let i = 1; i <= 10; i++) {
    const rev = i % 2 == 0;
    colorStars.push(
      <HalfStar
        reverse={rev}
        onMouseOver={() => setTempRating(i)}
        onClick={() => handleClick && handleClick(i)}
        onMouseOut={() => setTempRating(0)}
      >
        <Icon icon="star" size={20} color={ColorPalette.Yellow.YELLOW_600} />
      </HalfStar>
    );
  }

  return (
    <EmptyStars isHover={isHover}>
      {emptyStars}
      <ColorStars w={calculateStar(tempRating != 0 ? tempRating : rating)}>
        {colorStars}
      </ColorStars>
    </EmptyStars>
  );
};

export default RatedStar;
