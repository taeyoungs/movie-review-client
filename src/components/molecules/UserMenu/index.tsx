import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Avatar from 'products/Avatar';
import useGetAvatar from 'hooks/useGetAvatar';
import Menu from 'components/molecules/Menu';
import MenuItem from 'components/atoms/MenuItem';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGOUT } from 'queries/Mutation';

const UserMenuContainer = styled.div`
  position: relative;
`;

const AvatarContainer = styled.div`
  display: flex;
  margin-left: 10px;
  cursor: pointer;
`;

const UserMenu: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { avatar, login } = useGetAvatar();
  const history = useHistory();
  const [logout] = useMutation(LOGOUT);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemTitleList = ['프로필', '로그아웃'];
  // ToDo: 프로필로 이동

  const handleLogout = () => {
    Cookies.remove('signedin');
    Cookies.remove('avatar');
    Cookies.remove('login');
    logout();
    history.go(0);
  };
  return (
    <UserMenuContainer ref={containerRef}>
      <AvatarContainer onClick={() => setIsOpen((prevState) => !prevState)}>
        {avatar ? <Avatar src={avatar} /> : <Avatar username={login} />}
      </AvatarContainer>
      <Menu isOpen={isOpen} className="user--menu">
        {itemTitleList.map((item, index) => (
          <MenuItem
            key={index}
            title={item}
            name={item}
            selected={false}
            onClick={
              index === 0
                ? () => setIsOpen(false)
                : () => {
                    setIsOpen(false);
                    handleLogout();
                  }
            }
          />
        ))}
      </Menu>
    </UserMenuContainer>
  );
};

export default UserMenu;
