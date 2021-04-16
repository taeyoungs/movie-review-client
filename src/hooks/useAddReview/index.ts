import { useMutation } from '@apollo/client';
import { UPDATE_REVIEW } from 'queries/Mutation';
import { REVIEWS_QUERY } from 'queries/Query';
import { IReviewProps } from 'models/types';

interface IProps {
  movieId: string;
  content: string;
  reviewId: number;
}

const useAddReview = ({ movieId, content, reviewId }: IProps) => {
  const [mutate, { data, error }] = useMutation(UPDATE_REVIEW, {
    variables: {
      content,
      reviewId,
    },
    update(cache, { data }) {
      const updatedReview = data?.updateReview;
      const existedReview = cache.readQuery<{ reviews: IReviewProps[] }>({
        query: REVIEWS_QUERY,
        variables: {
          id: movieId,
          size: 20,
          skip: 0,
        },
      });

      if (updatedReview) {
        if (existedReview) {
          cache.writeQuery({
            query: REVIEWS_QUERY,
            data: {
              reviews: [...existedReview?.reviews, updatedReview],
            },
            variables: {
              id: movieId,
              size: 20,
              skip: 0,
            },
          });
        } else {
          cache.writeQuery({
            query: REVIEWS_QUERY,
            data: {
              reviews: [updatedReview],
            },
            variables: {
              id: movieId,
              size: 20,
              skip: 0,
            },
          });
        }
      }
    },
  });

  return { mutate, data, error };
};

export default useAddReview;
