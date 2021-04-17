import { useMutation } from '@apollo/client';
import { TOGGLE_LIKE_REVIEW } from 'queries/Mutation';

const useToggleLike = (id: number) => {
  const [toggleLike] = useMutation(TOGGLE_LIKE_REVIEW, {
    variables: {
      reviewId: id,
    },
  });

  return { toggleLike };
};

export default useToggleLike;
