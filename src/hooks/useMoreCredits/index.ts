import { useMutation } from '@apollo/client';
import { IWorkProps } from 'models/types';
import { GET_MORE_CREDITS } from 'queries/Mutation';
import { GET_PERSON_CREDITS_QUERY } from 'queries/Query';

interface IProps {
  personId: string;
  page: number;
}

const useMoreCredits = ({ personId, page }: IProps) => {
  const [mutate, { loading }] = useMutation(GET_MORE_CREDITS, {
    variables: {
      personId,
      page,
    },
    update(cache, { data }) {
      const extraCredits = data?.getMoreCredits;
      const existedCredits = cache.readQuery<{
        getPersonCredits: { credits: IWorkProps[] };
      }>({
        query: GET_PERSON_CREDITS_QUERY,
        variables: {
          personId,
          page: 1,
        },
      });

      if (extraCredits && existedCredits) {
        cache.writeQuery({
          query: GET_PERSON_CREDITS_QUERY,
          data: {
            getPersonCredits: {
              ...existedCredits.getPersonCredits,
              credits: [
                ...existedCredits.getPersonCredits.credits,
                ...extraCredits,
              ],
            },
          },
          variables: {
            personId,
            page: 1,
          },
        });
      }
    },
  });

  return { mutate, loading };
};

export default useMoreCredits;
