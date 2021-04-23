import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import GridInner from 'components/molecules/GridInner';
import useRemoveReview from 'hooks/useRemoveReview';
import { IReviewProps } from 'models/types';
import useToggleDispatch from 'hooks/useToggleDispatch';
import useToggleState from 'hooks/useToggleState';

const NotifiContainer = styled.div<{ toggleNotifi: boolean }>`
  display: ${(props) => (props.toggleNotifi ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  z-index: 150;
  background: rgba(0, 0, 0, 0.56);
  overflow: hidden scroll;
`;

const NotifiInner = styled.div`
  position: absolute;
  inset: 0;
  z-index: 151;

  @media (min-width: 720px) {
    text-align: center;
    padding: 20px 0px;
    overflow: auto;
  }
`;

const Inset = styled.div`
  display: flex;
  position: absolute;
  inset: 0px;
  z-index: 152;
  align-items: center;
  justify-content: center;
`;

const Notifi = styled.div`
  background-color: #fff;
  text-align: center;
  width: 280px;
  padding: 20px 0 0;
  border-radius: 8px;
`;

const NotifiTitle = styled.div`
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 22px;
  white-space: pre-wrap;
`;

const NotifiContent = styled.div`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.5px;
  white-space: pre-wrap;
  padding: 0 0 24px;
  border-bottom: 1px solid #e5e5e5;
  margin: 8px 0 0;
  word-break: break-all;
`;

const NotifiMenu = styled.div`
  display: flex;
`;

const NotifiMenuItem = styled.button`
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  color: #f1c40f;
  line-height: 22px;
  letter-spacing: -0.7px;
  margin: 11px 0;
  flex: 1 1 0%;
  background: none;
  border: none;
  outline: none;
  border-color: #e5e5e5 !important;
  &:nth-of-type(1) {
    border-right: 1px solid;
  }
`;

interface IProps {
  userReview: IReviewProps;
}

const ToggleNotification: React.FC<IProps> = ({ userReview }) => {
  const dispatch = useToggleDispatch();
  const toggle = useToggleState();

  const { mutate: removeReviewMutation } = useRemoveReview({
    movieId: userReview.movieId,
    reviewId: userReview.id,
  });

  const handleToggleContainer: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        dispatch({ type: 'TOGGLE_NOTIFI' });
      }
    },
    []
  );

  const handleRemoveReview = useCallback(() => {
    removeReviewMutation();
    dispatch({ type: 'TOGGLE_NOTIFI' });
  }, []);

  return (
    <NotifiContainer toggleNotifi={toggle.toggleNotifi}>
      <NotifiInner onClick={handleToggleContainer}>
        <Inset>
          <Notifi>
            <GridInner>
              <NotifiTitle>알림</NotifiTitle>
              <NotifiContent>리뷰를 삭제하시겠어요?</NotifiContent>
              <NotifiMenu>
                <NotifiMenuItem
                  onClick={() => dispatch({ type: 'TOGGLE_NOTIFI' })}
                >
                  취소
                </NotifiMenuItem>
                <NotifiMenuItem onClick={handleRemoveReview}>
                  확인
                </NotifiMenuItem>
              </NotifiMenu>
            </GridInner>
          </Notifi>
        </Inset>
      </NotifiInner>
    </NotifiContainer>
  );
};

export default React.memo(ToggleNotification);
