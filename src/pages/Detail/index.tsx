import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';
import {
  CASTS_QUERY,
  DETAIL_QUERY,
  REVIEWS_QUERY,
  SIMILARWORKS_QUERY,
} from 'queries/Query';
import DetailSummarySection from 'components/organisms/DetailSummarySection';
import DetailContentTopSection from 'components/organisms/DetailContentTopSection';
import DetailContentMiddleSection from 'components/organisms/DetailContentMiddleSection';
import DetailContentBottomSection from 'components/organisms/DetailContentBottomSection';
import Loading from 'products/Loading';
import {
  ICastProps,
  IDetailProps,
  IReviewProps,
  ISimilarWorkProps,
} from 'models/types';

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
  const { loading, data } = useQuery<{ detail: IDetailProps }>(DETAIL_QUERY, {
    variables: {
      id: location.pathname.split('/')[2],
      mediaType: location.pathname.split('/')[1],
    },
  });
  const { loading: castLoading, data: castData } = useQuery<{
    casts: Array<ICastProps>;
  }>(CASTS_QUERY, {
    variables: {
      id: location.pathname.split('/')[2],
      mediaType: location.pathname.split('/')[1],
    },
  });

  const { loading: reviewLoading, data: reviewData } = useQuery<{
    reviews: Array<IReviewProps>;
  }>(REVIEWS_QUERY, {
    variables: {
      id: location.pathname.split('/')[2],
      size: 20,
      skip: 0,
    },
  });
  const { loading: similarWorksLoading, data: similarWorksData } = useQuery<{
    similarWorks: Array<ISimilarWorkProps>;
  }>(SIMILARWORKS_QUERY, {
    variables: {
      id: location.pathname.split('/')[2],
      mediaType: location.pathname.split('/')[1],
    },
  });

  return (
    <Main>
      {loading && castLoading && reviewLoading && similarWorksLoading ? (
        <Loading />
      ) : (
        data &&
        castData &&
        reviewData &&
        similarWorksData && (
          <>
            <DetailSummarySection movie={data.detail} />
            <ContentSection>
              <Inner>
                <DetailContentTopSection
                  movie={data.detail}
                  casts={castData.casts}
                  reviews={reviewData.reviews}
                />
                <DetailContentMiddleSection movie={data.detail} />
                <DetailContentBottomSection
                  similarWorks={similarWorksData.similarWorks}
                  mediaType={location.pathname.split('/')[1]}
                />
              </Inner>
            </ContentSection>
          </>
        )
      )}
    </Main>
  );
};

export default Detail;
