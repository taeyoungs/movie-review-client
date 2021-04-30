import React from 'react';
import styled from '@emotion/styled';
import { ISearchProps } from 'models/types';
import SearchItem from '../SearchItem';

const List = styled.ul<{ itemsLen: number }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: 0 -5px 0;
  ${(props) =>
    props.itemsLen === 1 &&
    `
    height: 76px;
    & .info-container {
        border-bottom: none;
    }
    `}
  ${(props) =>
    props.itemsLen === 2 &&
    `
    height: 152px;
    & li:last-child .info-container {
        border-bottom: none;
    }
    `}
  ${(props) => props.itemsLen >= 3 && 'height: 228px;'}
  &::after {
    content: "";
    display: inline-block;
    width: 20px;
    height: 100%;
  }
`;

interface IProps {
  items: ISearchProps[];
  ulElementRef: React.RefObject<HTMLUListElement>;
}

function SearchContentList({ items, ulElementRef }: IProps): JSX.Element {
  return (
    <List ref={ulElementRef} itemsLen={items.length}>
      {items.map((item) => (
        <SearchItem item={item} key={item.id} />
      ))}
    </List>
  );
}

export default React.memo(SearchContentList);
