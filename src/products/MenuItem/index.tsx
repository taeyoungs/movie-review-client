import React from 'react';
import EMenuItem from './WithEmotion';

interface IProps {
  title: string;
  selected: boolean;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const MenuItem: React.FC<IProps> = ({ title, selected, onClick }) => {
  return (
    <EMenuItem selected={selected} onClick={onClick}>
      {title}
    </EMenuItem>
  );
};

export default MenuItem;
