import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Link, { IProps } from '.';
import Background from 'products/_common';

export default {
  title: 'Design System/Link',
  component: Link,
  argTypes: {
    href: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [(Story) => <Background>{Story()}</Background>],
} as Meta;

const Template: Story<IProps> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = { children: 'Link Sample' };

export const All = (): JSX.Element => {
  return (
    <>
      <div style={{ marginRight: '10px' }}>
        <Link>Default</Link>
      </div>
      <div style={{ marginRight: '10px' }}>
        <Link secondary>Secondary </Link>
      </div>
      <Link underline>Underline</Link>
    </>
  );
};
