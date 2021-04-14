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

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($data: ReviewUpdateInput!, $where: Int!) {
    updateOneReview(data: $data, where: $where) {
      id
      content
      rating
      wrtierId
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;
