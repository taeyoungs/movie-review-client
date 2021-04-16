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

export const REVIEWS_QUERY = gql`
  query Reviews($id: String!, $size: Int!, $skip: Int!) {
    reviews(id: $id, size: $size, skip: $skip) {
      id
      content
      writerId
      movieTitle
      movieId
      rating
      likeCount
      isLike
      writer {
        name
        avatar
      }
    }
  }
`;

export const SIMILARWORKS_QUERY = gql`
  query SimilarWorks($id: String!, $mediaType: String!) {
    similarWorks(id: $id, media_type: $mediaType) {
      id
      title
      poster_path
      vote_average
    }
  }
`;

export const DETAIL_QUERY = gql`
  query Detail($id: String!, $mediaType: String!) {
    detail(id: $id, media_type: $mediaType) {
      id
      title
      poster_path
      backdrop_path
      vote_average
      vote_count
      overview
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

export const GET_USER_REVIEW_QUERY = gql`
  query GetUserReview($movieId: String!) {
    getUserReview(movieId: $movieId) {
      id
      content
      rating
      movieTitle
      movieId
    }
  }
`;
