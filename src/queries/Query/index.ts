import { gql } from '@apollo/client';

export const MULTI_SEARCH_QUERY = gql`
  query MultiSearch($term: String!, $page: Int!) {
    multiSearch(term: $term, page: $page) {
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

export const MOVIE_SEARCH_QUERY = gql`
  query SearchMovie($term: String!, $page: Int!) {
    searchMovie(term: $term, page: $page) {
      id
      poster_path
      title
      vote_average
      release_date
    }
  }
`;

export const SHOW_SEARCH_QUERY = gql`
  query SearchShow($term: String!, $page: Int!) {
    searchShow(term: $term, page: $page) {
      id
      poster_path
      name
      vote_average
      first_air_date
    }
  }
`;
