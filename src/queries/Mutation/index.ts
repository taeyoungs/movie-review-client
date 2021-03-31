import { gql } from '@apollo/client';

export const SOCIAL_AUTH_MUTATION = gql`
  mutation SocialAuth($token: String!) {
    socialAuth(token: $token) {
      user {
        avatar
        name
      }
    }
  }
`;
