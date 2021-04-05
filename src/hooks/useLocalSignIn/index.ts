import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { LOCAL_SIGN_IN } from 'queries/Mutation';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IUserProps } from 'models/types';

const useLocalSignIn = (props: { path: string }) => {
  const history = useHistory();
  const [localSignInMutation] = useMutation<{ localLogin: IUserProps }>(
    LOCAL_SIGN_IN,
    {
      update(cache, { data }) {
        if (data) {
          // Cookie.set('token', data.socialAuth.token);
          Cookies.set('signedin', 'true');
          if (data.localLogin.avatar) {
            Cookies.set('avatar', data.localLogin.avatar);
          } else {
            Cookies.set('login', data.localLogin.login);
          }
          // console.log(props.path);
          history.replace(props.path, { reload: true });
        }
      },
    }
  );

  const onLocalSignIn = useCallback(async (id: string, pw: string) => {
    try {
      await localSignInMutation({ variables: { id, pw } });
      return null;
    } catch (error) {
      return error.message;
    }
  }, []);

  return { onLocalSignIn };
};

export default useLocalSignIn;
