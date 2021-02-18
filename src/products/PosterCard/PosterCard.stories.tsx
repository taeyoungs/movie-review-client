import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import styled from '@emotion/styled';
import PosterCard, { IProps } from '.';
import { ColorPalette } from 'models/color';

export default {
  title: 'Design System/PosterCard',
  component: PosterCard,
} as Meta;

const Template: Story<IProps> = (args) => <PosterCard {...args} />;

export const Basic = Template.bind({});

const Bg = styled.div`
  background: ${ColorPalette.Main.BG_PRIMARY};
  height: 500px;
  width: 100%;
  justify-content: flex-start;
  display: flex;
  padding: 20px;
`;

export const BackgroundDark = () => {
  return (
    <Bg>
      <PosterCard />
    </Bg>
  );
};
