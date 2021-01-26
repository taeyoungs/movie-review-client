import React from 'react';
import Button, { ButtonAppearance, ButtonSize, IProps } from './index';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Background from 'products/_common';
import Icon from 'Icon/Icon';
import { ColorPalette } from 'models/color';

export default {
  title: 'Products/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: Object.values(ButtonSize),
      },
    },
    appearance: {
      control: {
        type: 'select',
        options: Object.values(ButtonAppearance),
      },
    },
  },
  decorators: [(Story) => <Background>{Story()}</Background>],
} as Meta;

const Template: Story<IProps> = (args) => {
  console.log(args);
  return <Button {...args} />;
};

export const Default = Template.bind({});
Default.args = { children: '버튼', onClick: action('onClick') };

/** asdafasfsd */
export const Appearance: Story<IProps> = (args) => {
  return (
    <>
      <Button {...args} appearance={ButtonAppearance.DEFAULT}>
        Default
      </Button>
      <Button {...args} appearance={ButtonAppearance.PRIMARY}>
        Primary
      </Button>
      <Button {...args} appearance={ButtonAppearance.SECONDARY}>
        Secondary
      </Button>
    </>
  );
};

export const Sizes: Story<IProps> = (args) => {
  return (
    <>
      <Button {...args} size={ButtonSize.SMALL}>
        Button
      </Button>
      <Button {...args} size={ButtonSize.MEDIUM}>
        Button
      </Button>
      <Button {...args} size={ButtonSize.BIG}>
        Button
      </Button>
    </>
  );
};

export const Disabled: Story<IProps> = (args) => {
  return (
    <>
      <Button {...args} appearance={ButtonAppearance.DEFAULT} disabled>
        Default
      </Button>
      <Button {...args} appearance={ButtonAppearance.PRIMARY} disabled>
        Primary
      </Button>
      <Button {...args} appearance={ButtonAppearance.SECONDARY} disabled>
        Secondary
      </Button>
    </>
  );
};

export const ButtonWithIcon: Story<IProps> = (args) => {
  return (
    <>
      <Button {...args} appearance={ButtonAppearance.DEFAULT}>
        <Icon
          icon="menu"
          color={ColorPalette.Neutral.NEUTRAL_1000}
          size="1rem"
        />
        <span style={{ display: 'inline-block', marginLeft: '0.5rem' }}>
          Default
        </span>
      </Button>
      <Button {...args} appearance={ButtonAppearance.PRIMARY}>
        <Icon icon="menu" color={ColorPalette.Neutral.NEUTRAL_0} size="1rem" />
        <span style={{ display: 'inline-block', marginLeft: '0.5rem' }}>
          Primary
        </span>
      </Button>
      <Button {...args} appearance={ButtonAppearance.SECONDARY}>
        <Icon icon="menu" color={ColorPalette.Yellow.YELLOW_400} size="1rem" />
        <span style={{ display: 'inline-block', marginLeft: '0.5rem' }}>
          Secondary
        </span>
      </Button>
    </>
  );
};
