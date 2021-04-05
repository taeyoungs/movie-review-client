import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const useGetAvatar = (): { avatar: string; login: string } => {
  const [avatar, setAvatar] = useState('');
  const [login, setLogin] = useState('');

  useEffect(() => {
    const userAvatar = Cookies.get('avatar');
    const login = Cookies.get('login');
    if (userAvatar) {
      setAvatar(userAvatar);
    }
    if (login) {
      setLogin(login);
    }
  });
  return { avatar, login };
};

export default useGetAvatar;
