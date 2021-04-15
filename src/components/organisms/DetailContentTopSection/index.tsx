import React, { useState } from 'react';
import styled from '@emotion/styled';
import ContentCastSection from 'components/organisms/ContentCastSection';
import ContentReviewSection from 'components/organisms/ContentReviewSection';
import GridInner from 'components/molecules/GridInner';
import Avatar, { AvatarSize } from 'products/Avatar';
import { ICastProps, IDetailProps, IReviewProps } from 'models/types';
import { ColorPalette } from 'models/color';
import Cookie from 'js-cookie';

const ContentContainer = styled.div`
  @media (min-width: 720px) {
    float: left;
    width: 100%;
  }
  @media (min-width: 1024px) {
    float: left;
    width: 640px;
    padding: 0 8px;
  }
`;

const Content = styled.div`
  margin: 12px 0 0;
  @media (min-width: 720px) {
    margin: 0;
  }
`;

const TopRoundedContent = styled.div`
  background-color: #fff;
  overflow: hidden;
  @media (min-width: 720px) and (max-width: 1024px) {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-top: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
  @media (min-width: 1024px) {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-top: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
`;

const InfoSection = styled.section`
  padding: 8px 0 0;
`;

const InfoArticle = styled.article`
  font-size: 15px;
  letter-spacing: -0.4px;
  line-height: 20px;
  color: ${ColorPalette.Main.TEXT_BODY};
`;

const ArticleSummary = styled.div`
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -0.2px;
  margin: 8px 0;
`;

const ArticleOverviewWrapper = styled.div`
  word-break: break-all;
  overflow: hidden;
  max-height: 200px;
  margin: 0;
`;

const ArticleOverview = styled.div`
  font-size: 15px;
  letter-spacing: -0.2px;
  line-height: 24px;
  white-space: pre-wrap;
`;

const DivideBorder = styled.hr`
  border: 0;
  border-bottom: 1px solid #f0f0f0;
  margin: 20px 0 0;
`;

const OverviewButtonWrapper = styled.div`
  margin-top: 10px;
  text-align: right;
`;

const OverviewButton = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #f1c40f;

  cursor: pointer;
  display: inline-block;
`;

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
  font-family: 'Nanum Gothic';
`;

interface IProps {
  movie: IDetailProps;
  casts: ICastProps[];
  reviews: IReviewProps[];
  userReview: IReviewProps | null;
}

const DetailContentTopSection: React.FC<IProps> = ({
  movie,
  casts,
  reviews,
  userReview,
}) => {
  const [fullOverview, setFullOverview] = useState(false);
  const avatarUrl = Cookie.get('avatar');
  const username = Cookie.get('login');

  const handleOverview = () => {
    setFullOverview((prevState) => !prevState);
  };

  return (
    <ContentContainer>
      {userReview && (
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
                        <ReviewBtn>리뷰 남기기</ReviewBtn>
                      </ReviewBtnWrapper>
                    </>
                  ) : (
                    <>
                      <Avatar
                        src={avatarUrl}
                        size={AvatarSize.LARGE}
                        username={username}
                      />
                      <UserReviewContent>
                        {userReview.content}
                      </UserReviewContent>
                      <UserReviewMenu>
                        <UserReviewMenuItem>
                          <MenuItemBtn>삭제</MenuItemBtn>
                        </UserReviewMenuItem>
                        <UserReviewMenuItem>
                          <MenuItemBtn>수정</MenuItemBtn>
                        </UserReviewMenuItem>
                      </UserReviewMenu>
                    </>
                  )}
                </ReviewBtnSectionInner>
              </ReviewBtnSection>
            </GridInner>
          </ReviewBtnInner>
        </ReviewBtnContainer>
      )}
      <Content>
        <TopRoundedContent>
          <InfoSection>
            <GridInner title>기본 정보</GridInner>
            <GridInner>
              <InfoArticle>
                <ArticleSummary>
                  {movie.title}
                  <br />
                  {movie.release_date.slice(0, 4)}
                  &nbsp;•&nbsp;
                  {movie.genres
                    .map((genre, i) =>
                      i !== movie.genres.length - 1
                        ? `${genre.name}/`
                        : genre.name
                    )
                    .join('')}
                  •&nbsp;{movie.runtime}분
                </ArticleSummary>
                <ArticleOverviewWrapper>
                  {movie.overview.length > 0 && (
                    <ArticleOverview>
                      {fullOverview
                        ? movie.overview
                        : movie.overview.slice(0, 130) + ' ...'}
                    </ArticleOverview>
                  )}
                </ArticleOverviewWrapper>
                {movie.overview.length > 0 && (
                  <OverviewButtonWrapper>
                    <OverviewButton onClick={handleOverview}>
                      {fullOverview ? '접기' : '펼치기'}
                    </OverviewButton>
                  </OverviewButtonWrapper>
                )}
              </InfoArticle>
              <DivideBorder />
            </GridInner>
          </InfoSection>
          <ContentCastSection casts={casts} />
          <ContentReviewSection reviews={reviews} />
        </TopRoundedContent>
      </Content>
    </ContentContainer>
  );
};

export default DetailContentTopSection;
