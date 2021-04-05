import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { LOCAL_SIGN_UP } from 'queries/Mutation';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IUserProps } from 'models/types';

const useLocalSignUp = (props: { path: string }) => {
  const history = useHistory();
  const [localSignUpMutaion] = useMutation<{ localSignUp: IUserProps }>(
    LOCAL_SIGN_UP,
    {
      update(cache, { data }) {
        if (data) {
          // Cookie.set('token', data.socialAuth.token);
          Cookies.set('signedin', 'true');
          Cookies.set('login', data.localSignUp.login);
          history.replace(props.path, { reload: true });
        }
      },
    }
  );

  const onLocalSignUp = useCallback(async (id: string, pw: string) => {
    try {
      await localSignUpMutaion({ variables: { id, pw } });
      return null;
    } catch (error) {
      return error.message;
    }
  }, []);

  return { onLocalSignUp };
};

export default useLocalSignUp;
