import { gql } from '@apollo/client';

export const SOCIAL_AUTH_MUTATION = gql`
  mutation SocialAuth($token: String!) {
    socialAuth(token: $token) {
      avatar
    }
  }
`;

export const LOCAL_SIGN_IN = gql`
  mutation LocalSignIn($id: String!, $pw: String!) {
    localLogin(login: $id, password: $pw) {
      avatar
      login
    }
  }
`;

export const LOCAL_SIGN_UP = gql`
  mutation LocalSignUp($id: String!, $pw: String!) {
    localSignUp(login: $id, password: $pw) {
      avatar
      login
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $movieId: String!
    $movieTitle: String!
    $rating: Float!
  ) {
    createReview(movieId: $movieId, movieTitle: $movieTitle, rating: $rating) {
      id
      content
      rating
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($content: String, $rating: Float, $reviewId: Int!) {
    updateReview(content: $content, rating: $rating, reviewId: $reviewId) {
      id
      content
      rating
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const TOGGLE_LIKE_REVIEW = gql`
  mutation ToggleLikeReview($reviewId: Int!) {
    toggleLikeReview(reviewId: $reviewId) {
      id
      isLike
      likeCount
    }
  }
`;

export const GET_MORE_CREDITS = gql`
  mutation GetMoreCredits($personId: String!, $page: Int!) {
    getMoreCredits(personId: $personId, page: $page) {
      id
      title
      vote_average
      poster_path
      media_type
    }
  }
`;
