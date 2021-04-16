import React from 'react';
import Button, { ButtonAppearance, ButtonSize, IProps } from './index';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Background from 'products/_common';
import Icon from 'Icon/Icon';
import { ColorPalette } from 'models/color';

export default {
  title: 'Design System/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: Object.values(ButtonSize),
      },
      defaultValue: ButtonSize.MEDIUM,
      table: {
        defaultValue: { summary: ButtonSize.MEDIUM },
        type: {
          summary: '목록',
          detail: '"small" | "medium" | "big"',
        },
      },
    },
    appearance: {
      control: {
        type: 'select',
        options: Object.values(ButtonAppearance),
      },
      defaultValue: ButtonAppearance.DEFAULT,
      table: {
        defaultValue: { summary: ButtonAppearance.DEFAULT },
        type: {
          summary: '목록',
          detail:
            '"default" | "primary" | "secondary" | "outline" | "outline_primary"',
        },
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <Background>
        <div>{Story()}</div>
      </Background>
    ),
  ],
} as Meta;

const Template: Story<IProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = { children: '버튼', onClick: action('onClick') };

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
      <Button {...args} appearance={ButtonAppearance.OUTLINE}>
        Outline
      </Button>
      <Button {...args} appearance={ButtonAppearance.OUTLINE_PRIMARY}>
        Outline Primary
      </Button>
    </>
  );
};

export const Sizes: Story<IProps> = (args) => {
  return (
    <>
      <Button {...args} size={ButtonSize.SMALL}>
        Small
      </Button>
      <Button {...args} size={ButtonSize.MEDIUM}>
        Medium
      </Button>
      <Button {...args} size={ButtonSize.BIG}>
        Big
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
      <Button {...args} appearance={ButtonAppearance.OUTLINE} disabled>
        Outline
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

export const OnlyIcon: Story<IProps> = (args) => {
  return (
    <>
      <Button {...args} appearance={ButtonAppearance.DEFAULT} onlyIcon={true}>
        <Icon
          icon="menu"
          color={ColorPalette.Neutral.NEUTRAL_1000}
          size="1rem"
        />
      </Button>
      <Button {...args} appearance={ButtonAppearance.PRIMARY} onlyIcon={true}>
        <Icon icon="menu" color={ColorPalette.Neutral.NEUTRAL_0} size="1rem" />
      </Button>
    </>
  );
};

export const ArrowButton: Story<IProps> = (args) => {
  return (
    <Button
      {...args}
      appearance={ButtonAppearance.OUTLINE_PRIMARY}
      onlyIcon={true}
    >
      <Icon
        icon="arrowRight"
        color={ColorPalette.Neutral.NEUTRAL_0}
        size={18}
      />
    </Button>
  );
};
