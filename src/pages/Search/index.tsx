import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import SearchContentSection from 'components/organisms/SearchContentSection';
import GridInner from 'components/molecules/GridInner';
import Loading from 'products/Loading';
import { useQuery } from '@apollo/client';
import { MULTI_SEARCH_QUERY } from 'queries/Query';
import { ISearchProps } from 'models/types';
import qs from 'qs';

const Main = styled.main`
  margin-top: 3.5rem;
  width: 100%;
  background-color: #fff;
  min-height: calc(100vh - 3.5rem);
`;

const Section = styled.section`
  padding: 0 0 32px;
`;

const QueryContainer = styled.div`
  padding: 30px 0 10px;
`;

const Query = styled.h1`
  font-size: 18px;
  letter-spacing: -0.2px;
  line-height: 22px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;

  & span {
    font-weight: 700;
  }
`;

const NoResults = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Notification = styled.div`
  text-align: center;
  padding: 10px 0 20px;
  color: #a0a0a0;
  font-size: 15px;
  letter-spacing: -0.5px;
  line-height: 20px;
  white-space: pre-wrap;
`;

// ToDo: query 3개 - 영화, TV 프로그램, 사람
// Section 3개인데 동일한 디자인 props만 다르게
// 더보기 페이지도 동일
function Search(): JSX.Element {
  const location = useLocation();
  const { query } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const { loading: movieLoading, data: movieData } = useQuery<{
    multiSearch: {
      searches: ISearchProps[];
      totalPage: number;
    };
  }>(MULTI_SEARCH_QUERY, {
    variables: {
      term: query,
      page: 1,
      searchType: 'movie',
    },
  });
  const { loading: showLoading, data: showData } = useQuery<{
    multiSearch: {
      searches: ISearchProps[];
      totalPage: number;
    };
  }>(MULTI_SEARCH_QUERY, {
    variables: {
      term: query,
      page: 1,
      searchType: 'tv',
    },
  });
  const { loading: personLoading, data: personData } = useQuery<{
    multiSearch: {
      searches: ISearchProps[];
      totalPage: number;
    };
  }>(MULTI_SEARCH_QUERY, {
    variables: {
      term: query,
      page: 1,
      searchType: 'person',
    },
  });

  if (movieLoading || showLoading || personLoading) return <Loading />;

  return (
    <Main>
      <Section>
        <QueryContainer>
          <GridInner>
            <Query>
              <span>"{query}"</span>로 검색한 결과입니다.
            </Query>
          </GridInner>
        </QueryContainer>
        {movieData && movieData.multiSearch.searches.length > 0 && (
          <SearchContentSection
            items={movieData.multiSearch.searches.slice(0, 9)}
            query={query as string}
            headerTitle="영화"
          />
        )}
        {showData && showData.multiSearch.searches.length > 0 && (
          <SearchContentSection
            items={showData.multiSearch.searches.slice(0, 9)}
            query={query as string}
            headerTitle="TV 프로그램"
          />
        )}
        {personData && personData.multiSearch.searches.length > 0 && (
          <SearchContentSection
            items={personData.multiSearch.searches.slice(0, 9)}
            query={query as string}
            headerTitle="사람"
          />
        )}
        {movieData?.multiSearch.searches.length === 0 &&
          showData?.multiSearch.searches.length === 0 &&
          personData?.multiSearch.searches.length === 0 && (
            <NoResults>
              <Notification>
                검색 결과가 없습니다. 다른 키워드로 검색해보세요. (ง •_•)ง
              </Notification>
            </NoResults>
          )}
      </Section>
    </Main>
  );
}

export default Search;
