import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_REVIEW } from 'queries/Mutation';
import { REVIEWS_QUERY } from 'queries/Query';
import { IReviewProps } from 'models/types';

interface IProps {
  movieId: string;
  reviewId: number;
}

const useRemoveReview = ({ movieId, reviewId }: IProps) => {
  const [mutate, { data, error }] = useMutation(UPDATE_REVIEW, {
    variables: {
      reviewId,
      content: '',
    },
    update(cache, { data }) {
      const updateReview: IReviewProps = data?.updateReview;
      const exitedReviews = cache.readQuery<{ reviews: IReviewProps[] }>({
        query: REVIEWS_QUERY,
        variables: {
          id: movieId,
          size: 20,
          skip: 0,
        },
      });

      if (updateReview && exitedReviews) {
        cache.writeQuery({
          query: REVIEWS_QUERY,
          variables: {
            id: movieId,
            size: 20,
            skip: 0,
          },
          data: {
            reviews: exitedReviews.reviews.filter(
              (review) => review.id !== updateReview.id
            ),
          },
        });
      }
    },
  });

  return { mutate, data, error };
};

export default useRemoveReview;
