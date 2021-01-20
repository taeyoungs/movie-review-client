import { Story } from '@storybook/react/types-6-0';
import Icon, { IProps } from './Icon';

export default {
  title: 'Design System/Atoms/Icon',
  component: Icon,
};

const Template: Story<IProps> = (args) => <Icon {...args} />;

export const Menu = Template.bind({});
Menu.args = { icon: 'menu' };

export const CustomSize = Template.bind({});
CustomSize.args = { icon: 'menu', size: '3rem' };

export const CustomColor = Template.bind({});
CustomColor.args = { icon: 'menu', color: '#f1c40f' };
