import React from 'react';
import { EMenuItem } from './WithEmotion';
import Icon, { IconType } from 'Icon/Icon';

interface IProps {
  title: string;
  selected: boolean;
  iconName?: IconType;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  name: string;
}

const MenuItem: React.FC<IProps> = ({
  title,
  selected,
  onClick,
  iconName,
  name,
}) => {
  return (
    <EMenuItem selected={selected} onClick={onClick} data-name={name}>
      {iconName && <Icon icon={iconName} size={14} />} {title}
    </EMenuItem>
  );
};

export default MenuItem;
