import { IComponentProps } from 'models/common';
import React from 'react';
import { CalculateBox } from 'utils';
import ECard from './WithEmotion';

interface IProps extends IComponentProps {
  radius?: [number, number?, number?, number?];
  children: React.ReactNode;
}

const Card: React.FC<IProps> = ({
  children,
  margin = [0],
  padding = [0],
  radius = [0],
  style,
  className,
}) => {
  const styleProps = {
    ...style,
    margin: CalculateBox(margin),
    padding: CalculateBox(padding),
    borderRadius: CalculateBox(radius),
  };

  return (
    <ECard className={className} style={styleProps}>
      {children}
    </ECard>
  );
};

export default Card;
