import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { LOCAL_SIGN_IN } from 'queries/Mutation';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IUserProps } from 'models/types';

const useLocalSignIn = (props: { path: string }) => {
  const history = useHistory();
  const [localSignInMutation] = useMutation<{ socialAuth: IUserProps }>(
    LOCAL_SIGN_IN,
    {
      update(cache, { data }) {
        if (data) {
          // Cookie.set('token', data.socialAuth.token);
          Cookies.set('signedin', 'true');
          Cookies.set('avatar', JSON.stringify(data.socialAuth.avatar));
          // console.log(props.path);
          history.replace(props.path, { reload: true });
        }
      },
    }
  );

  const onLocalSignIn = useCallback((id: string, pw: string) => {
    localSignInMutation({ variables: { id, pw } });
  }, []);

  return { onLocalSignIn };
};

export default useLocalSignIn;
