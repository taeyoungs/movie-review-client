import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';
import { MOVIE_DETAIL_QUERY } from 'queries/Query';
import { IMovieProps } from 'models/types';
import DetailSummarySection from 'components/organisms/DetailSummarySection';

const Main = styled.main`
  margin-top: 3.5rem;
  width: 100%;
  background-color: #f4f4f4;
`;

const Detail: React.FunctionComponent = () => {
  const location = useLocation();
  const { loading, data } = useQuery<{ movie: IMovieProps }>(
    MOVIE_DETAIL_QUERY,
    {
      variables: {
        id: location.pathname.split('/')[2],
      },
    }
  );

  return (
    <Main>
      {loading ? (
        <div>loading...</div>
      ) : (
        data && <DetailSummarySection movie={data.movie} />
      )}
    </Main>
  );
};

export default Detail;
