import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { SOCIAL_AUTH_MUTATION } from 'queries/Mutation';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

interface IUserProps {
  avatar: string;
}

interface IProps {
  user: IUserProps;
}

const useSocialAuth = (props: { path: string }) => {
  const history = useHistory();
  const [socialAuthMutation] = useMutation<{ socialAuth: IProps }>(
    SOCIAL_AUTH_MUTATION,
    {
      update(cache, { data }) {
        if (data) {
          // Cookie.set('token', data.socialAuth.token);
          Cookies.set('signedin', 'true');
          Cookies.set('avatar', JSON.stringify(data.socialAuth.user.avatar));
          // console.log(props.path);
          history.replace(props.path, { reload: true });
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
