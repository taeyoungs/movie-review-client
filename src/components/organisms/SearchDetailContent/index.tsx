import React from 'react';
import styled from '@emotion/styled';
import SearchItem from 'components/molecules/SearchItem';
import GridInner from 'components/molecules/GridInner';
import { ISearchProps } from 'models/types';

interface IProps {
  items: ISearchProps[];
}

const DetailContent = styled.div`
  margin: 10px 0 0;
`;

const SearchDetailList = styled.ul`
  margin: 0 -10px;
`;

function SearchDetailContent({ items }: IProps): JSX.Element {
  return (
    <DetailContent>
      <GridInner>
        <SearchDetailList>
          {items.map((item) => (
            <SearchItem item={item} key={item.id} isFull />
          ))}
        </SearchDetailList>
      </GridInner>
    </DetailContent>
  );
}

export default React.memo(SearchDetailContent);
