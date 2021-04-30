import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import SectionHeader from 'components/molecules/SectionHeader';
import SearchDetailContent from 'components/organisms/SearchDetailContent';
import Loading from 'products/Loading';
import { useQuery } from '@apollo/client';
import { MULTI_SEARCH_QUERY } from 'queries/Query';
import { ISearchProps } from 'models/types';
import qs from 'qs';

const Main = styled.main`
  margin-top: 3.5rem;
  background-color: #fff;
  min-height: calc(100vh - 3.5rem);
`;

const SearchDetailSection = styled.section`
  padding: 88px 0 30px;
`;

function SearchDetail(): JSX.Element {
  const { mediaType } = useParams<{ mediaType: string }>();
  const location = useLocation();
  const { query } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const { loading, data } = useQuery<{
    multiSearch: {
      searches: ISearchProps[];
      totalPage: number;
    };
  }>(MULTI_SEARCH_QUERY, {
    variables: {
      term: query,
      page: 1,
      searchType: mediaType,
    },
  });

  if (loading) return <Loading />;

  return (
    <Main>
      <SearchDetailSection>
        <SectionHeader
          title={
            mediaType === 'movie'
              ? '영화'
              : mediaType === 'tv'
              ? 'TV 프로그램'
              : '사람'
          }
        />
        {data && (
          <SearchDetailContent
            totalPage={data.multiSearch.totalPage}
            items={data.multiSearch.searches}
            mediaType={mediaType}
            query={query as string}
          />
        )}
      </SearchDetailSection>
    </Main>
  );
}

export default SearchDetail;
