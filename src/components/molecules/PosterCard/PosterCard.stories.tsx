import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PosterCard, { IProps } from '.';
import { Bg } from './WithEmotion';

export default {
  title: 'Design System/PosterCard',
  component: PosterCard,
} as Meta;

const Template: Story<IProps> = (args) => <PosterCard {...args} />;

export const Basic = Template.bind({});

export const BackgroundDark = (): JSX.Element => {
  return (
    <Bg isDark>
      <PosterCard isDark />
    </Bg>
  );
};

export const BackgroundWhite = (): JSX.Element => {
  return (
    <Bg>
      <PosterCard />
    </Bg>
  );
};

export const MultiPosterBgWhite = (): JSX.Element => {
  return (
    <Bg>
      <PosterCard />
      <PosterCard />
      <PosterCard />
      <PosterCard />
      <PosterCard />
    </Bg>
  );
};

export const MultiPosterBgDark = (): JSX.Element => {
  return (
    <Bg isDark>
      <PosterCard isDark />
      <PosterCard isDark />
      <PosterCard isDark />
      <PosterCard isDark />
      <PosterCard isDark />
    </Bg>
  );
};
