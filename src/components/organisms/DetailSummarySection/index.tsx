import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import RatedStar from 'products/RatedStar';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW, UPDATE_REVIEW } from 'queries/Mutation';
import { GET_USER_REVIEW_QUERY } from 'queries/Query';
import { IDetailProps, IReviewProps } from 'models/types';
import Cookie from 'js-cookie';
import Icon from 'Icon/Icon';

const SummarySection = styled.section`
  background-color: #fff;
  @media (min-width: 720px) {
    border-bottom: 1px solid #e5e5e5;
  }
`;

const PosterContainer = styled.div`
  position: relative;
  padding: 44px 0px 20px;
  @media (min-width: 720px) {
    padding: 300px 0 0;
  }
  @media (min-width: 1024px) {
    padding: 270px 0 0;
  }
  @media (min-width: 1300px) {
    padding: 320px 0 0;
  }
  @media (min-width: 1400px) {
    padding: 360px 0 0;
  }
`;

const Inner = styled.div`
  margin: 0 auto;
  @media (min-width: 720px) {
    max-width: 640px;
  }
  @media (min-width: 1024px) {
    max-width: 960px;
  }
`;

const BackdropContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #000;
`;

const EmptyMask = styled.div`
  flex: 1;
`;

const RightMask = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 100px;
  background: linear-gradient(-90deg, transparent, #000 80%);
`;

const LeftMask = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  width: 100px;
  background: linear-gradient(90deg, transparent, #000 80%);
`;

const Backdrop = styled.div<{ url: string }>`
  position: relative;
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/original/${props.url}`});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  filter: blur(8px);
  @media (min-width: 720px) {
    top: auto;
    left: auto;
    height: 100%;
    width: 825px;
    filter: none;
  }
  @media (min-width: 1024px) {
    width: 768px;
  }
  @media (min-width: 1300px) {
    width: 910px;
  }
  @media (min-width: 1400px) {
    width: 1024px;
  }
`;

const TaglineAndPoster = styled.div`
  @media (min-width: 1024px) {
    padding: 0 8px;
  }
`;

const TaglineContainer = styled.div`
  position: relative;
  @media (min-width: 720px) {
    padding: 0 0 0 153px;
  }
  @media (min-width: 1024px) {
    padding: 0 0 0 163px;
  }
`;

const Tagline = styled.div`
  text-align: center;
  padding: 0 0 10px;
  margin: 15px 0 0;
  color: #fff;
  font-size: 14px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  @media (min-width: 720px) {
    text-align: left;
    padding: 0 0 10px 18px;
  }
  @media (min-width: 1024px) {
    padding: 0 0 10px 25px;
    margin: 0 -4px;
  }
`;

const LazyLoadingPoster = styled.div`
  overflow: hidden;
  display: block;
  position: relative;
  width: 128px;
  height: 184px;
  border-radius: 3px;
  margin: 0 auto;
  background-color: #e5e5e5;
  @media (min-width: 720px) {
    position: absolute;
    top: -24px;
    left: 0px;
    width: 153px;
    height: 221px;
  }
  @media (min-width: 1024px) {
    width: 166px;
    height: 233px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  border: 2px solid #e5e5e5;
`;

const SummaryContainer = styled.div`
  text-align: center;
  padding: 14px 16px 22px;
`;

const Summary = styled.div`
  @media (min-width: 1024px) {
    padding: 0 8px;
  }
`;

const SummaryInner = styled.div`
  @media (min-width: 720px) {
    text-align: left;
    margin: 0 0 0 173px;
  }
  @media (min-width: 1024px) {
    margin: 0 0 0 191px;
  }
`;

const SummaryTitle = styled.h1`
  @media (min-width: 720px) {
    font-size: 25px;
    font-weight: 700;
    line-height: 30px;
    letter-spaceing: -0.9px;
  }
  @media (min-width: 1024px) {
    font-size: 33px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: -1.2px;
  }
`;

const SummaryContent = styled.div`
  font-size: 15px;
  font-weight: 400;
  margin-top: 3px;
  line-height: 20px;
  letter-spacing: -0.5px;
  color: rgba(0, 0, 0, 0.5);
  @media (min-width: 1024px) {
    font-size: 17px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.7px;
    margin-top: 4px;
  }
`;

const SummaryRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  margin-top: 14px;
  padding: 7px 0;
  @media (min-width: 720px) {
    justify-content: flex-start;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.5px;
    padding: 8px 0;
  }
  @media (min-width: 1024px) {
    justify-content: flex-start;
    font-size: 17px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.7px;
    padding: 8px 0;
  }
`;

const SummaryHoverRating = styled.div`
  margin: 15px 0 0;
`;

const HoverNotification = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 0 10px;
  padding: 0 0 0 4px;
  color: rgba(0, 0, 0, 0.5);
`;

interface IProps {
  movie: IDetailProps;
  handleToggleLogin: () => void;
  userReview: IReviewProps | null;
}

const DetailSummarySection: React.FC<IProps> = ({
  movie,
  handleToggleLogin,
  userReview,
}) => {
  const [rating, setRating] = useState(0);

  const [createReviewMutation] = useMutation(CREATE_REVIEW, {
    variables: {
      movieTitle: movie.title,
      movieId: `${movie.id}`,
      rating,
    },
    refetchQueries: [
      { query: GET_USER_REVIEW_QUERY, variables: { movieId: `${movie.id}` } },
    ],
  });
  const [updateReviewMutation] = useMutation(UPDATE_REVIEW, {
    variables: {
      rating,
      ...(userReview && { reviewId: userReview.id }),
    },
  });

  useEffect(() => {
    if (!userReview && rating !== 0) {
      createReviewMutation();
    }
    if (userReview && rating !== 0) {
      updateReviewMutation();
    }
  }, [rating]);

  function handleClick(i: number) {
    const isSigned = Cookie.get('signedin');
    if (Boolean(isSigned)) {
      setRating(i);
    } else {
      handleToggleLogin();
    }
  }

  return (
    <SummarySection>
      <PosterContainer>
        <BackdropContainer>
          <EmptyMask />
          <Backdrop url={movie.backdrop_path}>
            <RightMask></RightMask>
            <LeftMask></LeftMask>
          </Backdrop>
          <EmptyMask />
        </BackdropContainer>
        <Inner>
          <TaglineAndPoster>
            <TaglineContainer>
              <LazyLoadingPoster>
                <Poster
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
              </LazyLoadingPoster>
              <Tagline>
                {movie.tagline ? movie.tagline : '#놀랄만한 #경이로운 #화제작'}
              </Tagline>
            </TaglineContainer>
          </TaglineAndPoster>
        </Inner>
      </PosterContainer>
      <SummaryContainer>
        <Inner>
          <Summary>
            <SummaryInner>
              <SummaryTitle>{movie.title}</SummaryTitle>
              <SummaryContent>
                {movie.release_date.slice(0, 4)}&nbsp;•&nbsp;
                {movie.genres
                  .map((genre, i) =>
                    i !== movie.genres.length - 1
                      ? `${genre.name}/`
                      : genre.name
                  )
                  .join('')}
              </SummaryContent>
              <SummaryRating>
                <Icon icon="star" color="#f1c40f" size={18} />
                &nbsp;
                {movie.vote_average}&nbsp;(&nbsp;
                <Icon icon="person" color="#000" size={18} />
                &nbsp;
                {movie.vote_count}명)
              </SummaryRating>
              <SummaryHoverRating>
                <HoverNotification>
                  재밌게 보셨다면 평점을 남겨보세요.
                </HoverNotification>
                <RatedStar
                  isHover
                  rating={userReview?.rating || 0}
                  handleClick={handleClick}
                />
              </SummaryHoverRating>
            </SummaryInner>
          </Summary>
        </Inner>
      </SummaryContainer>
    </SummarySection>
  );
};

export default React.memo(DetailSummarySection);
