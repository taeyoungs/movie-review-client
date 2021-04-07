import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';
import { CASTS_QUERY, MOVIE_DETAIL_QUERY } from 'queries/Query';
import DetailSummarySection from 'components/organisms/DetailSummarySection';
import DetailContentTopSection from 'components/organisms/DetailContentTopSection';
import { ICastProps, IMovieProps } from 'models/types';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';
import Loading from 'products/Loading';
import DetailContentMiddleSection from 'components/organisms/DetailContentMiddleSection';

const Main = styled.main`
  margin-top: 3.5rem;
  width: 100%;
  background-color: #f4f4f4;
`;

const ContentSection = styled.div`
  overflow: hidden;
  @media (min-width: 720px) {
    padding: 28px 0 48px;
  }
`;

const Inner = styled.div`
  margin: 0 auto;
  @media (min-width: 720px) {
    max-width: 640px;
  }
  @media (min-width: 1024px) {
    max-width: 976px;
  }
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
  const { loading: castLoading, data: castData } = useQuery<{
    casts: Array<ICastProps>;
  }>(CASTS_QUERY, {
    variables: {
      id: location.pathname.split('/')[2],
      mediaType: location.pathname.split('/')[1],
    },
  });

  return (
    <Main>
      {loading && castLoading ? (
        <Loading />
      ) : (
        data &&
        castData && (
          <>
            <DetailSummarySection movie={data.movie} />
            <ContentSection>
              <Inner>
                <DetailContentTopSection
                  movie={data.movie}
                  casts={castData.casts}
                />
                <DetailContentMiddleSection movie={data.movie} />
              </Inner>
            </ContentSection>
          </>
        )
      )}
    </Main>
  );
};

export default Detail;
