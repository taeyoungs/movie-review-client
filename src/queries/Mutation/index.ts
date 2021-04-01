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
    }
  }
`;
