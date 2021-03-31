import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const useGetAvatar = (): string => {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const userAvatar = Cookies.get('avatar');
    if (userAvatar) {
      setAvatar(userAvatar);
    }
  });
  return avatar;
};

export default useGetAvatar;
