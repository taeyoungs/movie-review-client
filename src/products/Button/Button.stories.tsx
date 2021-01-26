import React from 'react';
import Button, { IProps } from './index';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { Wrapper } from './WithEmotion';
import Icon from 'Icon/Icon';

export default {
  title: 'Design System/Atoms/Button',
  component: Button,

  argTypes: {
    size: {
      control: {
        type: 'select',
      },
    },
    appearance: {
      control: {
        type: 'select',
      },
    },
    children: {
      type: { required: true },
    },
  },
  decorators: [(story) => <div style={{ padding: '2rem' }}>{story()}</div>],
} as Meta;

const Template: Story<IProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = { children: 'Button', onClick: action('onClick') };

export const Appearance: Story<IProps> = (args) => {
  return (
    <Wrapper>
      <Button {...args} appearance="default">
        Default
      </Button>
      <Button {...args} appearance="primary">
        Primary
      </Button>
      <Button {...args} appearance="secondary">
        Secondary
      </Button>
    </Wrapper>
  );
};

export const Sizes: Story<IProps> = (args) => {
  return (
    <div>
      <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Small</div>
      <Button {...args} size="small">
        Button
      </Button>
      <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Medium</div>
      <Button {...args} size="medium">
        Button
      </Button>
      <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Big</div>
      <Button {...args} size="big">
        Button
      </Button>
    </div>
  );
};

export const Disabled: Story<IProps> = (args) => {
  return (
    <Wrapper>
      <Button {...args} appearance="default" disabled>
        Default
      </Button>
      <Button {...args} appearance="primary" disabled>
        Primary
      </Button>
      <Button {...args} appearance="secondary" disabled>
        Secondary
      </Button>
    </Wrapper>
  );
};

export const ButtonWithIcon: Story<IProps> = (args) => {
  return (
    <Wrapper>
      <Button {...args} appearance="default">
        <Icon icon="menu" color="black" size="1rem" />
        <span style={{ display: 'inline-block', marginLeft: '0.5rem' }}>
          Default
        </span>
      </Button>
      <Button {...args} appearance="primary">
        <Icon icon="menu" color="white" size="1rem" />
        <span style={{ display: 'inline-block', marginLeft: '0.5rem' }}>
          Primary
        </span>
      </Button>
      <Button {...args} appearance="secondary">
        <Icon icon="menu" color="#f1c40f" size="1rem" />
        <span style={{ display: 'inline-block', marginLeft: '0.5rem' }}>
          Secondary
        </span>
      </Button>
    </Wrapper>
  );
};
