import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Avatar, { AvatarSize, IProps } from '.';
import Background from 'products/_common';

export default {
  title: 'Design System/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      defaultValue: AvatarSize.MEDIUM,
      table: {
        defaultValue: { summary: AvatarSize.MEDIUM },
        type: {
          summary: '목록',
          detail: '"large" | "medium" | "small" | "tiny"',
        },
      },
      control: {
        type: 'select',
        options: Object.values(AvatarSize),
      },
    },
  },
  decorators: [(Story) => <Background>{Story()}</Background>],
} as Meta;

const sampleAvatar =
  'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

const Template: Story<IProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});

export const Large = (): JSX.Element => {
  return (
    <>
      <Avatar isLoading={true} size={AvatarSize.LARGE} />
      <Avatar size={AvatarSize.LARGE} />
      <Avatar src={sampleAvatar} size={AvatarSize.LARGE} />
    </>
  );
};

export const Medium = (): JSX.Element => {
  return (
    <>
      <Avatar isLoading={true} size={AvatarSize.MEDIUM} />
      <Avatar size={AvatarSize.MEDIUM} />
      <Avatar src={sampleAvatar} size={AvatarSize.MEDIUM} />
    </>
  );
};

export const Small = (): JSX.Element => {
  return (
    <>
      <Avatar isLoading={true} size={AvatarSize.SMALL} />
      <Avatar size={AvatarSize.SMALL} />
      <Avatar src={sampleAvatar} size={AvatarSize.SMALL} />
    </>
  );
};

export const Tiny = (): JSX.Element => {
  return (
    <>
      <Avatar isLoading={true} size={AvatarSize.TINY} />
      <Avatar size={AvatarSize.TINY} />
      <Avatar src={sampleAvatar} size={AvatarSize.TINY} />
    </>
  );
};
