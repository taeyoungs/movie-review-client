import React from 'react';
import { EMenuItem } from './WithEmotion';
import Icon, { IconType } from 'Icon/Icon';

interface IProps {
  title: string;
  selected: boolean;
  iconName?: IconType;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const MenuItem: React.FC<IProps> = ({ title, selected, onClick, iconName }) => {
  return (
    <EMenuItem selected={selected} onClick={onClick}>
      {iconName && <Icon icon={iconName} size={14} />} {title}
    </EMenuItem>
  );
};

export default MenuItem;
