import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import GridInner from 'components/molecules/GridInner';
import ReviewItem from 'components/molecules/ReviewItem';
import { IReviewProps } from 'models/types';
import Icon from 'Icon/Icon';

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

const ArrowButtonBlock = styled.div<{ dir: string; displayNone: boolean }>`
  display: flex;
  height: 100%;
  align-items: center;
  transition: opacity 300ms ease;
  position: absolute;
  opacity: 0;
  top: 0;
  ${(props) =>
    props.dir === 'left' &&
    `
    
    left: 10px;
    & div {
      transform: rotate(-180deg);
    }
  `}
  ${(props) => props.dir === 'left' && props.displayNone && 'display: none'}
  ${(props) =>
    props.dir === 'right' &&
    `
    right: 10px;
  `}
  ${(props) => props.dir === 'right' && props.displayNone && 'display: none'}
`;

const ArrowButton = styled.div`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background-color: #fff;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const [transformWidth, setTransformWidth] = useState(0);
  const [listSize, setListSize] = useState(0);
  const reviewListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.innerWidth >= 720) {
      setListSize(2);
    } else {
      setListSize(1);
    }
    // window.addEventListener('resize', () => {
    //   setTransformWidth(0);
    //   if (window.innerWidth >= 720) {
    //     setListSize(2);
    //   } else {
    //     setListSize(1);
    //   }
    // });
  }, []);

  const handleSwipe: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      let width = 0;
      if (reviewListRef.current) {
        width = reviewListRef.current.clientWidth;
      }
      if (e.currentTarget.parentElement) {
        const dir = e.currentTarget.parentElement.getAttribute('dir');
        if (dir === 'left') {
          setTransformWidth((prevState) => prevState - width);
          if (window.innerWidth >= 720) {
            setListSize((prevState) => prevState - 2);
          } else {
            setListSize((prevState) => prevState - 1);
          }
        }
        if (dir === 'right') {
          setTransformWidth((prevState) => prevState + width);
          if (window.innerWidth >= 720) {
            setListSize((prevState) => prevState + 2);
          } else {
            setListSize((prevState) => prevState + 1);
          }
        }
      }
    },
    []
  );

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
              <ReviewList ref={reviewListRef}>
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
        <ArrowButtonBlock
          dir="left"
          className="arrow-button"
          displayNone={transformWidth === 0}
        >
          <ArrowButton onClick={handleSwipe}>
            <Icon icon="arrowRight" size={16} />
          </ArrowButton>
        </ArrowButtonBlock>
        <ArrowButtonBlock
          dir="right"
          className="arrow-button"
          displayNone={reviews.length <= listSize}
        >
          <ArrowButton onClick={handleSwipe}>
            <Icon icon="arrowRight" size={16} />
          </ArrowButton>
        </ArrowButtonBlock>
      </ReviewContainer>
      <GridInner>
        <DivideBorder />
      </GridInner>
    </InfoSection>
  );
};

export default React.memo(ContentReviewSection);
