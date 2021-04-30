import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import SearchItem from 'components/molecules/SearchItem';
import GridInner from 'components/molecules/GridInner';
import useMoreSearchData from 'hooks/useMoreSearchData';
import { ISearchProps } from 'models/types';
import Icon from 'Icon/Icon';

const DetailContent = styled.div`
  margin: 10px 0 0;
`;

const SearchDetailList = styled.ul`
  margin: 0 -10px;
`;

const LoadingScrollBlock = styled.div`
  display: block;
  text-align: center;
  height: 1px;
  margin: 0 auto;
  min-height: 1px;
`;

interface IProps {
  items: ISearchProps[];
  totalPage: number;
  mediaType: string;
  query: string;
}

function SearchDetailContent({
  items,
  totalPage,
  mediaType,
  query,
}: IProps): JSX.Element {
  const pageRef = useRef(2);
  const loadingRef = useRef<HTMLDivElement>(null);
  const { mutate, loading } = useMoreSearchData({
    page: pageRef.current,
    searchType: mediaType,
    term: query,
  });

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const documentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (totalPage > pageRef.current + 1) {
              if (!loading) {
                mutate();
                pageRef.current += 1;
              }
            } else {
              documentObserver.unobserve(entry.target);
            }
          }
        });
      });

      if (loadingRef.current) {
        documentObserver.observe(loadingRef.current);
      }
    }
  }, []);

  return (
    <DetailContent>
      <GridInner>
        <SearchDetailList>
          {items.map((item) => (
            <SearchItem item={item} key={item.id} isFull />
          ))}
        </SearchDetailList>
      </GridInner>
      <LoadingScrollBlock ref={loadingRef}>
        {loading && <Icon icon="spinner" size={30} />}
      </LoadingScrollBlock>
    </DetailContent>
  );
}

export default React.memo(SearchDetailContent);
