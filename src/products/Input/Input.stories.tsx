import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Input, { InputAppearance, InputOrientation, IProps } from '.';
import { action } from '@storybook/addon-actions';

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
      defaultValue: InputOrientation.HORIZONTAL,
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
    value: {
      defaultValue: 'value',
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
  decorators: [(Story) => <div style={{ padding: '10px' }}>{Story()}</div>],
} as Meta;

const Template: Story<IProps> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = { label: 'label', id: 'story', onChange: action('onChange') };

export const All = (): JSX.Element => {
  return (
    <>
      <Input label="Default" id="default" value="Default" />
      <Input
        label="Primary"
        id="primary"
        value="Primary"
        appearance={InputAppearance.PRIMARY}
      />
      <Input
        label="Secondary"
        id="secondary"
        value="Secondary"
        appearance={InputAppearance.SECONDARY}
      />
      <Input
        label="Pill"
        id="pill"
        value="Pill"
        appearance={InputAppearance.PILL}
      />
    </>
  );
};

export const Default = (): JSX.Element => {
  return (
    <>
      <Input
        label="Placeholder"
        id="placeholder"
        hideLabel
        placeholder="Placeholder"
      />
      <Input label="Value" id="value" hideLabel value="Value" />
      <Input
        label="Disabled"
        id="disabled"
        disabled
        hideLabel
        value="Disabled"
      />
      <Input label="Label Default" id="label" value="Label" />
      <Input
        label="Error"
        hideLabel
        id="error"
        error="With Error"
        value="Error"
      />
    </>
  );
};

export const Primary = (): JSX.Element => {
  return (
    <>
      <Input
        label="Placeholder"
        id="placeholder"
        hideLabel
        placeholder="Placeholder"
        appearance={InputAppearance.PRIMARY}
      />
      <Input
        label="Value"
        id="value"
        hideLabel
        value="Value"
        appearance={InputAppearance.PRIMARY}
      />
      <Input
        label="Disabled"
        id="disabled"
        disabled
        hideLabel
        value="Disabled"
        appearance={InputAppearance.PRIMARY}
      />
      <Input
        label="Label Primary"
        id="label"
        value="Label"
        appearance={InputAppearance.PRIMARY}
      />
      <Input
        label="Error"
        hideLabel
        id="error"
        error="With Error"
        value="Error"
        appearance={InputAppearance.PRIMARY}
      />
    </>
  );
};

export const Secondary = (): JSX.Element => {
  return (
    <>
      <Input
        label="Placeholder"
        id="placeholder"
        hideLabel
        placeholder="Placeholder"
        appearance={InputAppearance.SECONDARY}
      />
      <Input
        label="Value"
        id="value"
        hideLabel
        value="Value"
        appearance={InputAppearance.SECONDARY}
      />
      <Input
        label="Disabled"
        id="disabled"
        disabled
        hideLabel
        value="Disabled"
        appearance={InputAppearance.SECONDARY}
      />
      <Input
        label="Label Secondary"
        id="label"
        value="Label"
        appearance={InputAppearance.SECONDARY}
      />
      <Input
        label="Error"
        hideLabel
        id="error"
        error="With Error"
        value="Error"
        appearance={InputAppearance.SECONDARY}
      />
    </>
  );
};

export const Pill = (): JSX.Element => {
  return (
    <>
      <Input
        label="Placeholder"
        id="placeholder"
        hideLabel
        placeholder="Placeholder"
        appearance={InputAppearance.PILL}
      />
      <Input
        label="Value"
        id="value"
        hideLabel
        value="Value"
        appearance={InputAppearance.PILL}
      />
      <Input
        label="Disabled"
        id="disabled"
        disabled
        hideLabel
        value="Disabled"
        appearance={InputAppearance.PILL}
      />
      <Input
        label="Label Pill"
        id="label"
        value="Label"
        appearance={InputAppearance.PILL}
      />
      <Input
        label="Error"
        hideLabel
        id="error"
        error="With Error"
        value="Error"
        appearance={InputAppearance.PRIMARY}
      />
    </>
  );
};
