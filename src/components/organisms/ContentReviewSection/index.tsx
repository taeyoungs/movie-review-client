import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import GridInner from 'components/molecules/GridInner';
import ReviewItem from 'components/molecules/ReviewItem';
import ListArrowBtnBlock from 'components/molecules/ListArrowBtnBlock';
import useListTransform from 'hooks/useListTransform';
import { IReviewProps } from 'models/types';

const InfoSection = styled.section`
  padding: 8px 0 0;
`;

const ReviewContainer = styled.div`
  position: relative;
  &:hover .arrow-button {
    opacity: 1;
  }
`;

const ReviewExposure = styled.div`
  overflow: hidden;
  margin: 0 -5px;
  padding: 0 5px;
`;

const ReviewSwiper = styled.div`
  transition: 500ms;
`;

const ReviewList = styled.ul`
  white-space: nowrap;
  margin: 14px -5px 30px;
`;

const EmptyReview = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ReviewCount = styled.span`
  display: inline-block;
  font-size: 15px;
  color: #a0a0a0;
  letter-spacing: -0.5px;
  line-height: 20px;
  margin: 12px 0 12px 6px;
`;

const DivideBorder = styled.hr`
  border: 0;
  border-bottom: 1px solid #f0f0f0;
  margin: 20px 0 0;
`;

interface IProps {
  reviews: IReviewProps[];
}

const ContentReviewSection: React.FC<IProps> = ({ reviews }) => {
  const {
    state,
    ulElementRef,
    setInitialSize,
    handleSwipe,
  } = useListTransform([1, 2]);
  const { transformWidth, currentListSize } = state;

  useEffect(() => {
    if (window.innerWidth >= 720) {
      setInitialSize(2);
    } else {
      setInitialSize(1);
    }
  }, []);

  return (
    <InfoSection>
      <GridInner title>
        리뷰<ReviewCount>{reviews.length}</ReviewCount>
      </GridInner>
      <ReviewContainer>
        <ReviewExposure>
          <ReviewSwiper
            style={{
              transform: `translateX(-${transformWidth}px)`,
            }}
          >
            <GridInner>
              <ReviewList ref={ulElementRef}>
                {reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
                {reviews.length === 0 && (
                  <EmptyReview>등록된 리뷰가 없습니다. 😳</EmptyReview>
                )}
              </ReviewList>
            </GridInner>
          </ReviewSwiper>
        </ReviewExposure>
        <ListArrowBtnBlock
          transformWidth={transformWidth}
          handleSwipe={handleSwipe}
          contentsLen={reviews.length}
          currentListSize={currentListSize}
        />
      </ReviewContainer>
      <GridInner>
        <DivideBorder />
      </GridInner>
    </InfoSection>
  );
};

export default ContentReviewSection;
