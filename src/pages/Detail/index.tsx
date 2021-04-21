import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';
import {
  CASTS_QUERY,
  DETAIL_QUERY,
  GET_USER_REVIEW_QUERY,
  REVIEWS_QUERY,
  SIMILARWORKS_QUERY,
} from 'queries/Query';
import DetailSummarySection from 'components/organisms/DetailSummarySection';
import DetailContentTopSection from 'components/organisms/DetailContentTopSection';
import DetailContentMiddleSection from 'components/organisms/DetailContentMiddleSection';
import DetailContentBottomSection from 'components/organisms/DetailContentBottomSection';
import ContentUserReviewSection from 'components/organisms/ContentUserReviewSection';
import ToggleReview from 'components/organisms/ToggleReview';
import ToggleNotification from 'components/organisms/ToggleNotification';
import Footer from 'components/organisms/Footer';
import Loading from 'products/Loading';
import {
  ICastProps,
  IDetailProps,
  IReviewProps,
  IWorkProps,
} from 'models/types';
import useToggleState from 'hooks/useToggleState';

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
  const toggle = useToggleState();

  const { toggleReview, toggleNotifi } = toggle;

  const location: {
    state: { reload: boolean };
    pathname: string;
  } = useLocation();
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

  const {
    loading: reviewLoading,
    data: reviewData,
    refetch: refetchReview,
  } = useQuery<{
    reviews: Array<IReviewProps>;
  }>(REVIEWS_QUERY, {
    variables: {
      id: location.pathname.split('/')[2],
      size: 20,
      skip: 0,
    },
  });
  const { loading: similarWorksLoading, data: similarWorksData } = useQuery<{
    similarWorks: Array<IWorkProps>;
  }>(SIMILARWORKS_QUERY, {
    variables: {
      id: location.pathname.split('/')[2],
      mediaType: location.pathname.split('/')[1],
    },
  });
  const {
    loading: userReviewLoading,
    data: userReview,
    refetch: refetchUserReview,
  } = useQuery<{
    getUserReview: IReviewProps;
  }>(GET_USER_REVIEW_QUERY, {
    variables: {
      movieId: location.pathname.split('/')[2],
    },
  });

  useEffect(() => {
    if (location.state && location.state.reload) {
      refetchUserReview();
      refetchReview();
    }
  }, []);

  return (
    <Main>
      {loading &&
      castLoading &&
      reviewLoading &&
      similarWorksLoading &&
      userReviewLoading ? (
        <Loading />
      ) : (
        data &&
        castData &&
        reviewData &&
        similarWorksData && (
          <>
            <DetailSummarySection
              movie={data.detail}
              userReview={userReview?.getUserReview || null}
            />
            <ContentSection>
              <Inner>
                <DetailContentTopSection
                  movie={data.detail}
                  userReview={
                    userReview?.getUserReview ? (
                      <ContentUserReviewSection
                        userReview={userReview.getUserReview}
                      />
                    ) : null
                  }
                  reviews={reviewData.reviews}
                  casts={castData.casts}
                />
                <DetailContentMiddleSection movie={data.detail} />
                <DetailContentBottomSection
                  similarWorks={similarWorksData.similarWorks}
                  mediaType={location.pathname.split('/')[1]}
                />
              </Inner>
            </ContentSection>
            <Footer />
          </>
        )
      )}
      {userReview?.getUserReview && (
        <ToggleReview
          toggleReview={toggleReview}
          userReview={userReview.getUserReview}
        />
      )}
      {userReview?.getUserReview &&
        userReview?.getUserReview.content.length > 0 && (
          <ToggleNotification
            toggleNotifi={toggleNotifi}
            userReview={userReview.getUserReview}
          />
        )}
    </Main>
  );
};

export default Detail;
