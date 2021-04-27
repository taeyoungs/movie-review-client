import { useMutation } from '@apollo/client';
import { IWorksProps } from 'models/types';
import { GET_MORE_WORKS } from 'queries/Mutation';
import { GET_WORKS_QUERY } from 'queries/Query';

interface IProps {
  page: number;
  contentType: string;
  mediaType: string;
}

function useMoreWorks({ page, contentType, mediaType }: IProps) {
  const [mutate, { loading }] = useMutation(GET_MORE_WORKS, {
    variables: {
      contentType,
      mediaType,
      page,
    },
    update(cache, { data }) {
      const extraWorks = data?.getMoreWorks;
      const existedWorks = cache.readQuery<{ getWorks: IWorksProps }>({
        query: GET_WORKS_QUERY,
        variables: {
          contentType,
          mediaType,
          page: 1,
        },
      });

      if (extraWorks && existedWorks) {
        cache.writeQuery({
          query: GET_WORKS_QUERY,
          data: {
            ...existedWorks.getWorks,
            getWorks: {
              works: existedWorks.getWorks.works.concat(extraWorks),
              totalPage: existedWorks.getWorks.totalPage,
            },
          },
          variables: {
            contentType,
            mediaType,
            page: 1,
          },
        });
      }
    },
  });

  return { mutate, loading };
}

export default useMoreWorks;
