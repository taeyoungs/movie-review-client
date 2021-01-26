import React from 'react';
import { IComponentProps } from 'models/common';
import { ELi, EUl } from './WithEmotion';

export enum MenuStyle {
  ROW = 'row',
  COLUMN = 'column',
}

export interface IMenuItem {
  name: string;
  component: React.FunctionComponent<any>;
  icon?: string;
  distance: [number, number];
}

interface IProps extends IComponentProps {
  items: IMenuItem[];
  menuStyle?: MenuStyle;
}

interface IItemProps {
  distance: [number, number];
  children: React.ReactNode;
}

const MenuTabItem: React.FC<IItemProps> = ({ distance, children }) => {
  const styleProps = {
    margin: [0, distance[1], 0, distance[0]].toString(),
  };
  return <ELi style={styleProps}>{children}</ELi>;
};

const MenuTab: React.FC<IProps> = ({ items, menuStyle = MenuStyle.ROW }) => {
  const styleProps = {
    flexDirection: menuStyle,
    justifyContent: menuStyle === MenuStyle.ROW ? 'center' : 'flex-start',
    alignItems: 'center',
  };
  return (
    <EUl style={styleProps}>
      {items.map((item) => {
        const ItemComponent: React.FunctionComponent<any> = item.component;

        return (
          <MenuTabItem distance={item.distance || [0, 0]}>
            <ItemComponent name={item.icon} icon={item.icon} />
          </MenuTabItem>
        );
      })}
    </EUl>
  );
};

export default MenuTab;
