import { IComponentProps } from 'models/common';
import React from 'react';
import EInlineBlock from './WithEmotion';

interface IProps extends IComponentProps {
  children: React.ReactNode;
  className?: string;
}

const InlineBlock: React.FC<IProps> = ({ children, className }) => {
  return <EInlineBlock className={className}>{children}</EInlineBlock>;
};

export default InlineBlock;
