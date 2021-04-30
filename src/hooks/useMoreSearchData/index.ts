import { useMutation } from '@apollo/client';
import { ISearchProps } from 'models/types';
import { GET_MORE_SEARCH_DATA } from 'queries/Mutation';
import { MULTI_SEARCH_QUERY } from 'queries/Query';

interface IProps {
  page: number;
  searchType: string;
  term: string;
}

function useMoreSearchData({ page, searchType, term }: IProps) {
  const [mutate, { loading }] = useMutation(GET_MORE_SEARCH_DATA, {
    variables: {
      searchType,
      term,
      page,
    },
    update(cache, { data }) {
      const extraData = data?.getMoreSearchData;
      const existedData = cache.readQuery<{
        multiSearch: {
          searches: ISearchProps[];
          totalPage: number;
        };
      }>({
        query: MULTI_SEARCH_QUERY,
        variables: {
          searchType,
          term,
          page: 1,
        },
      });

      if (extraData && existedData) {
        cache.writeQuery({
          query: MULTI_SEARCH_QUERY,
          data: {
            multiSearch: {
              ...existedData.multiSearch,
              searches: existedData.multiSearch.searches.concat(extraData),
              totalPage: existedData.multiSearch.totalPage,
            },
          },
          variables: {
            searchType,
            term,
            page: 1,
          },
        });
      }
    },
  });

  return { mutate, loading };
}

export default useMoreSearchData;
