import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import RatedStar, { IProps } from '.';

export default {
  title: 'Design System/RatedStar',
  component: RatedStar,
  argTypes: {
    rating: {
      control: {
        type: 'range',
        min: 0,
        max: 10,
        step: 1,
      },
      defaultValue: 0,
    },
  },
} as Meta;

const Template: Story<IProps> = (args) => <RatedStar {...args} />;

export const Basic = Template.bind({});
Basic.args = { rating: 0 };

export const WithRating = (): JSX.Element => {
  return <RatedStar rating={3.5} />;
};

export const HoverRating = (): JSX.Element => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleMouseOver(i: number) {
    setTempRating(rating);
    setRating(i);
  }

  function handleClick(i: number) {
    setTempRating(i);
    setRating(i);
  }

  function handleMouseOut() {
    setRating(tempRating);
    setTempRating(0);
  }

  return (
    <RatedStar
      rating={rating}
      isHover
      handleMouseOver={handleMouseOver}
      handleClick={handleClick}
      handleMouseOut={handleMouseOut}
    />
  );
};
