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

export const POPULAR_MOVIES_QUERY = gql`
  query PopularMovies($page: Int!) {
    movies(page: $page) {
      id
      poster_path
      title
      vote_average
      release_date
    }
  }
`;

export const TRENDING_MOVIES_QUERY = gql`
  query TrendingMovies($timeWindow: String!) {
    trendingMovies(timeWindow: $timeWindow) {
      id
      poster_path
      title
      vote_average
      release_date
    }
  }
`;

export const TRENDING_SHOWS_QUERY = gql`
  query TrendingShows($timeWindow: String!) {
    trendingShows(timeWindow: $timeWindow) {
      id
      poster_path
      name
      vote_average
      first_air_date
    }
  }
`;

export const MOVIE_DETAIL_QUERY = gql`
  query MovieDetail($id: String!) {
    movie(id: $id) {
      poster_path
      backdrop_path
      overview
      vote_average
      vote_count
      title
      tagline
      release_date
      runtime
      genres {
        id
        name
      }
      videos {
        key
        id
        name
      }
    }
  }
`;

export const CASTS_QUERY = gql`
  query Casts($id: String!, $mediaType: String!) {
    casts(id: $id, media_type: $mediaType) {
      id
      name
      character
      profile_path
    }
  }
`;
