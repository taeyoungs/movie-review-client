import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const useGetAvatar = (): { avatar: string; login: string } => {
  const [info, setInfo] = useState({
    avatar: '',
    login: '',
  });

  const { avatar, login } = info;

  useEffect(() => {
    const userAvatar = Cookies.get('avatar');
    const login = Cookies.get('login');
    setInfo((info) => {
      return {
        ...info,
        ...(userAvatar && { avatar: userAvatar }),
        ...(login && { login }),
      };
    });
  }, []);

  return { avatar, login };
};

export default useGetAvatar;
