import { gql } from '@apollo/client';

export const MULTI_SEARCH_QUERY = gql`
  query MultiSearch($term: String!, $page: Int!, $searchType: String!) {
    multiSearch(term: $term, page: $page, searchType: $searchType) {
      id
      poster_path
      profile_path
      media_type
      title
      name
      vote_average
      release_date
      first_air_date
    }
  }
`;

export const POPULAR_SHOWS_QUERY = gql`
  query PopularShows($page: Int!) {
    shows(page: $page) {
      id
      poster_path
      backdrop_path
      name
      overview
    }
  }
`;
