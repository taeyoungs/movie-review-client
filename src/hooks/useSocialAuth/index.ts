import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { SOCIAL_AUTH_MUTATION } from 'queries/Mutation';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

interface IUserProps {
  name: string;
  avatar: string;
}

interface IProps {
  user: IUserProps;
}

const useSocialAuth = () => {
  const history = useHistory();
  const [socialAuthMutation] = useMutation<{ socialAuth: IProps }>(
    SOCIAL_AUTH_MUTATION,
    {
      update(cache, { data }) {
        if (data) {
          Cookies.set('signedin', 'true');
          // Cookie.set('token', data.socialAuth.token);
          Cookies.set('user', JSON.stringify(data.socialAuth.user));
          history.push('/');
        }
      },
    }
  );

  const onSocialAuth = useCallback((token: string) => {
    socialAuthMutation({ variables: { token } });
  }, []);

  return { onSocialAuth };
};

export default useSocialAuth;
