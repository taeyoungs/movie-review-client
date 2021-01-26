import React from 'react';
import Block, { Direction, Sort } from 'components/molecules/Block';
import { IComponentProps } from 'models/common';

export enum ScrollType {
  HORIZONTAL,
  VERTICAL,
}

export enum ViewType {
  WRAP,
  OVERFLOW,
}

interface IProps extends IComponentProps {
  scrollType?: ScrollType;
  viewType?: ViewType;
  header?: React.ReactNode;
  innerPadding?: [number, number?, number?, number?];
  children: React.ReactNode;
}

const Scrollable: React.FC<IProps> = ({
  children,
  scrollType = ScrollType.HORIZONTAL,
  viewType = ViewType.WRAP,
  header,
  margin,
  padding,
  innerPadding,
}) => {
  const styleProps = {
    [scrollType === ScrollType.HORIZONTAL ? 'overflowX' : 'overflowY']:
      viewType === ViewType.OVERFLOW ? 'auto' : 'visible',
    flexWrap: ViewType.WRAP ? 'wrap' : 'nowrap',
  };

  return (
    <Block
      margin={margin}
      padding={padding}
      direction={Direction.COLUMN}
      sort={Sort.TOP_LEFT}
    >
      {header}
      <Block style={styleProps}>
        <Block
          sort={Sort.TOP_LEFT}
          direction={
            scrollType === ScrollType.HORIZONTAL
              ? Direction.ROW
              : Direction.COLUMN
          }
          padding={innerPadding}
        >
          {children}
        </Block>
      </Block>
    </Block>
  );
};

export default Scrollable;
