import React, { useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import MenuItem from 'components/atoms/MenuItem';
import Block, { Direction, Sort } from 'components/molecules/Block';
import { MenuButton } from 'components/organisms/SearchBar/WithEmotion';
import Background from 'products/_common';
import Button from 'components/atoms/Button';
import useComponentVisible from 'hooks/useComponentVisible';
import { ColorPalette } from 'models/color';
import Icon, { IconType } from 'Icon/Icon';
import Menu, { IProps } from '.';

export default {
  title: 'Design System/Menu',
  component: Menu,
  decorators: [(Story) => <Background>{Story()}</Background>],
} as Meta;

const Template: Story<IProps> = (args) => (
  <Menu {...args}>
    {itemTitleList.map((item) => (
      <MenuItem
        key={item}
        title={item}
        selected={'All' === item}
        onClick={() => alert(`Click ${item}`)}
        name={item}
      />
    ))}
  </Menu>
);

export const Basic = Template.bind({});
Basic.args = { isOpen: true };

const itemTitleList = ['All', 'Movies', 'TV Shows'];
const iconTitleList: Array<IconType> = ['search', 'movie', 'show'];

export const SearchbarMenu: React.FunctionComponent = () => {
  const [title, setTitle] = useState('All');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Block direction={Direction.COLUMN} sort={Sort.TOP_LEFT}>
      <div
        style={{ position: 'relative' }}
        onMouseLeave={() => setIsOpen(false)}
      >
        <MenuButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
          {title}{' '}
          <Icon
            icon="cone"
            color={ColorPalette.Neutral.NEUTRAL_1000}
            size={8}
          />
        </MenuButton>
        <Menu isOpen={isOpen}>
          {itemTitleList.map((item) => (
            <MenuItem
              key={item}
              title={item}
              selected={title === item}
              name={item}
              onClick={() => {
                setTitle(item);
                setIsOpen(false);
              }}
            />
          ))}
        </Menu>
      </div>
    </Block>
  );
};

export const PopupMenu = (): JSX.Element => {
  const [title, setTitle] = useState('All');
  const divRef = useRef<HTMLDivElement>(null);
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false, divRef);

  return (
    <Block direction={Direction.COLUMN} sort={Sort.TOP_LEFT}>
      <div style={{ marginBottom: '10px' }} ref={divRef}>
        <Button onClick={() => setIsComponentVisible(!isComponentVisible)}>
          Menu
        </Button>
      </div>
      <div ref={ref}>
        <Menu isOpen={isComponentVisible}>
          {itemTitleList.map((item) => (
            <MenuItem
              key={item}
              name={item}
              title={item}
              selected={title === item}
              onClick={() => {
                setTitle(item);
                setIsComponentVisible(!isComponentVisible);
              }}
            />
          ))}
        </Menu>
      </div>
    </Block>
  );
};

export const MenuWithIcon = (): JSX.Element => {
  return (
    <Menu isOpen={true}>
      {itemTitleList.map((item, index) => (
        <MenuItem
          key={index}
          title={item}
          name={item}
          selected={'All' === item}
          onClick={() => alert(item)}
          iconName={iconTitleList[index]}
        />
      ))}
    </Menu>
  );
};
