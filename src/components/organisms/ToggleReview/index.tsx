import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useMutation } from '@apollo/client';
import GridInner from 'components/molecules/GridInner';
import useToggleDispatch from 'hooks/useToggleDispatch';
import useAddReview from 'hooks/useAddReview';
import { UPDATE_REVIEW } from 'queries/Mutation';
import { IReviewProps } from 'models/types';
import Icon from 'Icon/Icon';

const ReviewContainer = styled.div<{ toggleReview: boolean }>`
  display: ${(props) => (props.toggleReview ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  z-index: 150;
  background: rgba(0, 0, 0, 0.56);
  overflow: hidden scroll;
`;

const ReviewInner = styled.div`
  position: absolute;
  inset: 0;
  z-index: 151;

  @media (min-width: 720px) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px 0px;
    overflow: auto;
  }
`;

const Review = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  @media (min-width: 720px) {
    display: inline-block;
    position: relative;
    text-align: left;
    width: 640px;
    height: auto;
    min-height: 540px;
    border-radius: 6px;
    overflow: auto;
  }
`;

const ReviewHeader = styled.header`
  width: 100%;
  height: 44px;
  padding: 0px 16px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 50;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
`;

const ReviewHeaderInner = styled.div`
  position: relative;
`;

const ReviewTitle = styled.em`
  margin: 14px 0;
  display: inline-block;
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  font-weight: 700;
  z-index: 2;
`;

const ExitButton = styled.button`
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  margin: 10px 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  z-index: 3;
`;

const WriteButton = styled.button<{ contentLen: number }>`
  background: none;
  border: none;
  cursor: ${(props) => (props.contentLen === 0 ? 'default' : 'pointer')};
  color: ${(props) => (props.contentLen === 0 ? '#d3d3d3' : '#f1c40f')};
  outline: none;
  margin: 14px 0;
  font-family: 'Nanum Gothic', sans-serif;
  z-index: 3;
`;

const ContentContainer = styled.div`
  height: 100%;
  padding: 44px 0 0;
  overflow-y: scroll;
  @media (min-width: 720px) {
    height: auto;
    overflow: auto;
  }
`;

const ContentInner = styled.div`
  position: relative;
  padding: 15px 0 0;
  height: 100%;
  overflow: scroll;
  @media (min-width: 720px) {
    overflow: hidden;
  }
`;

const Textarea = styled.textarea`
  line-height: 26px;
  font-size: 16px;
  letter-spacing: -0.7px;
  outline: none;
  margin: 1px 0;
  resize: none;
  overflow: auto;
  width: 100%;
  border: 0px;
  font-family: 'Nanum Gothic', sans-serif;
`;

interface IProps {
  toggleReview: boolean;
  userReview: IReviewProps;
}

const ToggleReview: React.FC<IProps> = ({ toggleReview, userReview }) => {
  const [content, setContent] = useState(userReview.content || '');
  const dispatch = useToggleDispatch();

  const [updateReviewMutation] = useMutation(UPDATE_REVIEW, {
    variables: {
      content,
      reviewId: userReview.id,
    },
  });

  const { mutate: addReviewMutation } = useAddReview({
    movieId: userReview.movieId,
    content,
    reviewId: userReview.id,
  });

  const handleToggleContainer: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        dispatch({ type: 'TOGGLE_REVIEW' });
      }
    },
    []
  );

  const handleUpdateReview = useCallback(() => {
    updateReviewMutation();
    dispatch({ type: 'TOGGLE_REVIEW' });
  }, []);

  const handleAddReview = useCallback(() => {
    addReviewMutation();
    dispatch({ type: 'TOGGLE_REVIEW' });
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    []
  );
  return (
    <ReviewContainer toggleReview={toggleReview}>
      <ReviewInner onClick={handleToggleContainer}>
        <Review>
          <ReviewHeader>
            <ReviewHeaderInner>
              <ExitButton onClick={() => dispatch({ type: 'TOGGLE_REVIEW' })}>
                <Icon icon="cross" color="#f1c40f" size={16} />
              </ExitButton>
            </ReviewHeaderInner>
            <ReviewTitle>{userReview.movieTitle}</ReviewTitle>
            <ReviewHeaderInner>
              <WriteButton
                contentLen={content.length}
                onClick={
                  userReview.content.length === 0
                    ? handleAddReview
                    : handleUpdateReview
                }
              >
                {userReview.content.length === 0 ? '리뷰 작성' : '리뷰 수정'}
              </WriteButton>
            </ReviewHeaderInner>
          </ReviewHeader>
          <ContentContainer>
            <ContentInner>
              <GridInner>
                <Textarea
                  value={content}
                  onChange={handleChange}
                  placeholder="이 작품에 대한 생각을 자유롭게 표현해주세요."
                />
              </GridInner>
            </ContentInner>
          </ContentContainer>
        </Review>
      </ReviewInner>
    </ReviewContainer>
  );
};

export default ToggleReview;
