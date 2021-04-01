import React, { useState } from 'react';
import styled from '@emotion/styled';
import Avatar from 'products/Avatar';
import useGetAvatar from 'hooks/useGetAvatar';
import Menu from 'components/molecules/Menu';
import MenuItem from 'components/atoms/MenuItem';
import Cookies from 'js-cookie';
import { useHistory, useLocation } from 'react-router-dom';

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
  const avatar = useGetAvatar();
  const history = useHistory();
  const itemTitleList = ['프로필', '로그아웃'];

  // ToDo: 프로필로 이동

  const handleLogout = () => {
    Cookies.remove('signedin');
    Cookies.remove('avatar');
    Cookies.remove('jwt');
    history.go(0);
  };
  return (
    <UserMenuContainer>
      <AvatarContainer onClick={() => setIsOpen((prevState) => !prevState)}>
        <Avatar src={avatar} />
      </AvatarContainer>
      <Menu isOpen={isOpen} className="user--menu">
        {itemTitleList.map((item, index) => (
          <MenuItem
            key={index}
            title={item}
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
