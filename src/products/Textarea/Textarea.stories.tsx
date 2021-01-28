import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Textarea, { IProps, TextAreaAppearance } from '.';
import { ColorPalette } from 'models/color';

export default {
  title: 'Design System/forms/Textarea',
  component: Textarea,
  argTypes: {
    appearance: {
      defaultValue: TextAreaAppearance.DEFAULT,
      table: {
        defaultValue: { summary: TextAreaAppearance.DEFAULT },
        type: {
          summary: '목록',
          detail: '"default" | "secondary"',
        },
      },
      control: {
        type: 'select',
        options: Object.values(TextAreaAppearance),
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    placeholder: {
      table: {
        disable: true,
      },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '20px',
          backgroundColor: ColorPalette.Neutral.NEUTRAL_200,
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as Meta;

const Template: Story<IProps> = (args) => <Textarea {...args} />;

export const Basic = Template.bind({});
Basic.args = { value: 'Default', label: 'Default' };

export const Default = (): JSX.Element => {
  return (
    <>
      <Textarea label="Default" id="default" />
      <Textarea value="With value" label="Default" id="value" />
      <Textarea disabled value="Disabled" label="Default" id="disabled" />
      <Textarea
        hideLabel={false}
        value="With label"
        label="Label Default"
        id="label"
      />
      <Textarea value="Error" label="Default" id="label" error="With Error" />
      <Textarea
        hideLabel={false}
        value="With label error"
        label="Label Default"
        id="label"
        error="With Error"
      />
    </>
  );
};

export const Secondary = (): JSX.Element => {
  return (
    <>
      <Textarea
        label="Secondary"
        id="secondary"
        appearance={TextAreaAppearance.SECONDARY}
      />
      <Textarea
        value="With value"
        label="Secondary"
        id="value"
        appearance={TextAreaAppearance.SECONDARY}
      />
      <Textarea
        disabled
        value="Disabled"
        label="Secondary"
        id="disabled"
        appearance={TextAreaAppearance.SECONDARY}
      />
      <Textarea
        hideLabel={false}
        value="With label"
        label="Label Secondary"
        id="label"
        appearance={TextAreaAppearance.SECONDARY}
      />
      <Textarea
        value="Error"
        label="Secondary"
        id="label"
        error="With Error"
        appearance={TextAreaAppearance.SECONDARY}
      />
      <Textarea
        hideLabel={false}
        value="With label error"
        label="Label Secondary"
        id="label"
        error="With Error"
        appearance={TextAreaAppearance.SECONDARY}
      />
    </>
  );
};
