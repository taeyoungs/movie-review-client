import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import Avatar, { AvatarSize } from 'products/Avatar';
import { IReviewProps } from 'models/types';
import { ColorPalette } from 'models/color';
import useToggleLike from 'hooks/useToggleLike';
import Icon from 'Icon/Icon';
import Cookie from 'js-cookie';
import useToggleDispatch from 'hooks/useToggleDispatch';

const DetailInner = styled.div`
  background-color: #f0f0f0;
  padding: 0 12px;
  overflow: hidden;
  border-radius: 6px;
`;

const ReviewWriter = styled.div`
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
`;

const ReviewWriterInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 14px;
  letter-spacing: -0.3px;
  line-height: 22px;
  overflow: hidden;
  margin: 11px 0px;
`;

const ReviewWriterName = styled.div`
  color: ${ColorPalette.Main.TEXT_BODY};
  text-overflow: ellipsis;
  margin-left: 10px;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.7px;
  overflow: hidden;
`;

const ReviewWriterRating = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  color: ${ColorPalette.Main.TEXT_BODY};
  font-size: 13px;
  letter-spacing: -0.3px;
  min-width: 55px;
  height: 26px;
  padding: 0 8px;
  border: 1px solid #e5e5e5;
  border-radius: 13px;
  margin: 10px 0 0 16px;
`;

const ReviewContent = styled.div`
  position: relative;
  height: auto;
  margin: 12px 0 15px;
`;

const ReviewContentOverview = styled.div`
  word-break: break-all;
  margin: 0;
  overflow: hidden;
  white-space: pre-wrap;
  font-size: 15px;
  letter-spacing: -0.2px;
  line-height: 24px;
`;

const ReviewLikeComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: 19px;
  height: 44px;
  color: #787878;
  border-top: 1px solid #e5e5e5;
`;

const LikeComment = styled.div`
  & em {
    margin: 0 15px 0 3px;
  }
  & span:nth-of-type(2) {
    display: inline-block;
    margin-top: 1px;
    cursor: default;
  }
`;

const LikeButtonContainer = styled.div`
  padding: 0 5px 0 0;
`;

const LikeButton = styled.button<{ isLike: boolean }>`
  cursor: pointer;
  border: none;
  outline: none;
  ${(props) =>
    props.isLike
      ? `
  background: #f1c40f;
  color: #fff;
  border-radius: 5px;
  `
      : `
  background: none;
  color: #f1c40f;
  `}
`;

interface IProps {
  review: IReviewProps;
}

const ReviewDetail: React.FC<IProps> = ({ review }) => {
  const { toggleLike } = useToggleLike(review.id);
  const dispatch = useToggleDispatch();

  const handleToggleLike = useCallback(() => {
    const signedin = Cookie.get('signedin');
    if (Boolean(signedin)) {
      toggleLike();
    } else {
      dispatch({ type: 'TOGGLE_LOGIN' });
    }
  }, []);
  return (
    <DetailInner>
      <ReviewWriter>
        <ReviewWriterInfo>
          <Avatar
            size={AvatarSize.MEDIUM}
            src={review.writer.avatar}
            username={review.writer.name}
          />
          <ReviewWriterName>{review.writer.name}</ReviewWriterName>
        </ReviewWriterInfo>
        <ReviewWriterRating>
          <Icon size={14} icon="star" color="#f1c40f" />
          <span>&nbsp;{review.rating}</span>
        </ReviewWriterRating>
      </ReviewWriter>
      <ReviewContent>
        <ReviewContentOverview>{review.content}</ReviewContentOverview>
      </ReviewContent>
      <ReviewLikeComment>
        <LikeComment>
          <span>👍</span>
          <em>{review.likeCount}</em>
          <span>📝</span>
          <em>0</em>
        </LikeComment>
        <LikeButtonContainer>
          <LikeButton onClick={handleToggleLike} isLike={review.isLike}>
            좋아요
          </LikeButton>
        </LikeButtonContainer>
      </ReviewLikeComment>
    </DetailInner>
  );
};

export default ReviewDetail;
