import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Input, { InputAppearance, InputOrientation, IProps } from '.';

export default {
  title: 'Design System/forms/Input',
  component: Input,
  argTypes: {
    appearance: {
      defaultValue: InputAppearance.DEFAULT,
      table: {
        defaultValue: { summary: InputAppearance.DEFAULT },
        type: {
          summary: '목록',
          detail: '"default" | "primary" | "secondary" | "pill"',
        },
      },
      control: {
        type: 'select',
        options: Object.values(InputAppearance),
      },
    },
    orientation: {
      defaultValue: InputOrientation.VERTICAL,
      table: {
        defaultValue: { summary: InputOrientation.VERTICAL },
        type: {
          summary: '목록',
          detail: '"vertical" | "horizontal"',
        },
      },
      control: {
        type: 'select',
        options: Object.values(InputOrientation),
      },
    },
    icon: {
      control: {
        type: 'string',
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<IProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = { label: 'label', id: 'story' };

// ToDo: input stories
