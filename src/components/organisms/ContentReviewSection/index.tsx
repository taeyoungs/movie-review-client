import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Avatar, { AvatarSize } from 'products/Avatar';
import GridInner from 'components/molecules/GridInner';
import { IReviewProps } from 'models/types';
import { ColorPalette } from 'models/color';
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

const ReviewItem = styled.li`
  padding: 0 5px;
  width: 100%;
  display: inline-block;
  vertical-align: top;
  @media (min-width: 720px) {
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const ReviewItemInner = styled.div`
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
  margin-left: 4px;
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
  height: 120px;
  margin: 12px 0 15px;
`;

const ReviewContentOverview = styled.div`
  word-break: break-all;
  max-height: 120px;
  margin: 0;
  overflow: hidden;
  white-space: pre-wrap;
  font-size: 15px;
  letter-spacing: -0.8px;
  line-height: 24px;
`;

const ReviewLink = styled(Link)`
  color: #000;
`;

const ReviewLikeComment = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 19px;
  height: 44px;
  color: #787878;
  border-top: 1px solid #e5e5e5;
  & em {
    margin: 0 15px 0 3px;
  }
  & span:nth-of-type(2) {
    display: inline-block;
    margin-top: 1px;
    cursor: default;
  }
`;

const ReviewIsLike = styled.span<{ isLike: boolean }>`
  transition: 300ms;
  cursor: pointer;
  &:hover {
    background-color: #f1c40f;
    border-radius: 5px;
  }
  ${(props) =>
    props.isLike &&
    `
    background-color: #f1c40f;
    border-radius: 5px;
  `}
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
    window.addEventListener('resize', () => {
      setTransformWidth(0);
      if (window.innerWidth >= 720) {
        setListSize(2);
      } else {
        setListSize(1);
      }
    });
    return () => {
      window.removeEventListener('resize', () => {
        setTransformWidth(0);
        if (window.innerWidth >= 720) {
          setListSize(2);
        } else {
          setListSize(1);
        }
      });
    };
  }, []);

  const handleSwipe: React.MouseEventHandler<HTMLDivElement> = (e) => {
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
  };

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
                  <ReviewItem key={review.id}>
                    <ReviewItemInner>
                      <ReviewWriter>
                        <ReviewWriterInfo>
                          <Avatar
                            size={AvatarSize.SMALL}
                            src={review.writer.avatar}
                            username={review.writer.name}
                          />
                          <ReviewWriterName>
                            {review.writer.name}
                          </ReviewWriterName>
                        </ReviewWriterInfo>
                        <ReviewWriterRating>
                          <Icon size={14} icon="star" color="#f1c40f" />
                          <span>&nbsp;{review.rating}</span>
                        </ReviewWriterRating>
                      </ReviewWriter>
                      <ReviewContent>
                        <ReviewLink to="#">
                          <ReviewContentOverview>
                            {review.content.length > 110
                              ? review.content.slice(0, 110) + ' ...'
                              : review.content}
                          </ReviewContentOverview>
                        </ReviewLink>
                      </ReviewContent>
                      <ReviewLikeComment>
                        <ReviewIsLike isLike={review.isLike}>👍</ReviewIsLike>
                        <em>{review.likeCount}</em>
                        <span>📝</span>
                        <em>0</em>
                      </ReviewLikeComment>
                    </ReviewItemInner>
                  </ReviewItem>
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

export default ContentReviewSection;
