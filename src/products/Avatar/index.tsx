import React from 'react';
import Icon from 'Icon/Icon';
import { Container } from './WithEmotion';
import { ColorPalette } from 'models/color';

export enum AvatarSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
  TINY = 'tiny',
}

export interface IProps {
  /** 아바타의 로딩 상태를 설정합니다. */
  isLoading?: boolean;
  /** 사진이 존재하지 않을 경우 표시될 사용자 이름을 설정합니다. */
  username?: string;
  /** 사진의 경로를 설정합니다. */
  src?: string;
  /** 아바타의 크기를 설정합니다. */
  size?: AvatarSize;
}

/** `Avatar` 컴포넌트는 사용자의 프로필 사진을 표시할 때 사용합니다. */
const Avatar: React.FC<IProps> = ({
  isLoading = false,
  username = 'loading',
  src,
  size = AvatarSize.MEDIUM,
}) => {
  return isLoading ? (
    <Container isLoading={isLoading} size={size} radius={[50]}>
      <Icon icon="user" color={ColorPalette.Neutral.NEUTRAL_0} />
    </Container>
  ) : (
    <Container size={size} radius={[50]}>
      {src ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
      ) : (
        username.slice(0, 1)
      )}
    </Container>
  );
};

export default Avatar;
