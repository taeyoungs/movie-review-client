import React from 'react';
import styled from '@emotion/styled';
import GridInner from 'components/molecules/GridInner';
import Avatar, { AvatarSize } from 'products/Avatar';
import { IReviewProps } from 'models/types';
import Cookie from 'js-cookie';
import useToggleDispatch from 'hooks/useToggleDispatch';

const ReviewBtnContainer = styled.div`
  @media (min-width: 720px) {
    margin: 0 0 12px;
  }
`;

const ReviewBtnInner = styled.div`
  border-color: #e5e5e5 !important;
  overflow: hidden;
  background-color: #fff;
  @media (min-width: 720px) and (max-width: 1024px) {
    border: 1px solid;
    border-radius: 6px;
  }
  @media (min-width: 1024px) {
    border: 1px solid;
    border-radius: 6px;
  }
`;

const ReviewBtnSection = styled.section`
  @media (min-width: 720px) {
    padding: 20px 0px;
    border-top: 0;
  }
  text-align: center;
  padding: 24px 0 8px;
  border-top: 1px solid #e5e5e5;
`;

const ReviewBtnSectionInner = styled.div`
  @media (min-width: 720px) {
    display: flex;
    align-items: center;
  }
`;

const ReviewNotification = styled.h3`
  font-size: 14px;
  letter-spacing: -0.5px;
  line-height: 20px;
  word-break: break-all;
  text-align: center;
  margin: 0 0 10px;
  color: #808080;
  @media (min-width: 720px) {
    flex: 1 1 0%;
    text-align: left;
    margin: 0px 20px 0 0;
    overflow: hidden;
  }
`;

const ReviewBtnWrapper = styled.div`
  width: 254px;
  margin: 0 auto;
`;

const ReviewBtn = styled.button`
  margin: 0px;
  padding: 0px;
  border: none;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.7px;
  width: 100%;
  height: 40px;
  border: 1px solid #808080;
  font-family: 'Nanum Gothic';
`;

const UserReviewContent = styled.div`
  font-size: 14px;
  letter-spacing: -0.5px;
  line-height: 20px;
  word-break: break-all;
  margin: 8px 0 0;

  @media (min-width: 720px) {
    flex: 1 1 0%;
    text-align: left;
    margin: 0px 16px;
  }
`;

const UserReviewMenu = styled.ul`
  font-size: 12px;
  letter-spacing: -0.2px;
  line-height: 16px;
  text-align: center;
  padding: 16px 0 13px;
`;

const UserReviewMenuItem = styled.li`
  display: inline-block;
  &:first-of-type button:after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 8px;
    margin: 0px 17px;
    background-color: #8c8c8c;
  }
`;

const MenuItemBtn = styled.button`
  background: none;
  padding: 0px;
  border: none;
  margin: 0px;
  cursor: pointer;
  color: #8c8c8c;
  font-family: 'Nanum Gothic', sans-serif;
  outline: none;
`;

interface IProps {
  userReview: IReviewProps;
}

const ContentUserReviewSection: React.FC<IProps> = ({ userReview }) => {
  const avatarUrl = Cookie.get('avatar');
  const username = Cookie.get('login');

  const dispatch = useToggleDispatch();

  return (
    <ReviewBtnContainer>
      <ReviewBtnInner>
        <GridInner>
          <ReviewBtnSection>
            <ReviewBtnSectionInner>
              {userReview.content.length === 0 ? (
                <>
                  <ReviewNotification>
                    이 작품에 대한 평가를 글로 남겨보세요.
                  </ReviewNotification>
                  <ReviewBtnWrapper>
                    <ReviewBtn
                      onClick={() => dispatch({ type: 'TOGGLE_REVIEW' })}
                    >
                      리뷰 남기기
                    </ReviewBtn>
                  </ReviewBtnWrapper>
                </>
              ) : (
                <>
                  <Avatar
                    src={avatarUrl}
                    size={AvatarSize.LARGE}
                    username={username}
                  />
                  <UserReviewContent>{userReview.content}</UserReviewContent>
                  <UserReviewMenu>
                    <UserReviewMenuItem>
                      <MenuItemBtn
                        onClick={() => dispatch({ type: 'TOGGLE_NOTIFI' })}
                      >
                        삭제
                      </MenuItemBtn>
                    </UserReviewMenuItem>
                    <UserReviewMenuItem>
                      <MenuItemBtn
                        onClick={() => dispatch({ type: 'TOGGLE_REVIEW' })}
                      >
                        수정
                      </MenuItemBtn>
                    </UserReviewMenuItem>
                  </UserReviewMenu>
                </>
              )}
            </ReviewBtnSectionInner>
          </ReviewBtnSection>
        </GridInner>
      </ReviewBtnInner>
    </ReviewBtnContainer>
  );
};

export default ContentUserReviewSection;
