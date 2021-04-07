import React from 'react';
import styled from '@emotion/styled';
import { IMovieProps } from 'models/types';
import { ColorPalette } from 'models/color';

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

const InfoSectionContainer = styled.div`
  display: block;
`;

const InfoSectionInner = styled.div`
  margin: 0 20px;
`;

const HeaderTitle = styled.h2`
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.7px;
  line-height: 28px;
  margin: 8px 0;
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
  max-height: 72px;
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
  border-bottom: 1px solid #e5e5e5;
  margin: 20px 0 0;
`;

interface IProps {
  movie: IMovieProps;
}

const DetailContentTopSection: React.FC<IProps> = ({ movie }) => {
  return (
    <ContentContainer>
      <Content>
        <TopRoundedContent>
          <InfoSection>
            <InfoSectionContainer>
              <InfoSectionInner>
                <HeaderTitle>기본 정보</HeaderTitle>
              </InfoSectionInner>
            </InfoSectionContainer>
            <InfoSectionContainer>
              <InfoSectionInner>
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
                    <ArticleOverview>
                      {movie.overview.slice(0, 130) + ' ...'}
                    </ArticleOverview>
                  </ArticleOverviewWrapper>
                </InfoArticle>
                <DivideBorder />
              </InfoSectionInner>
            </InfoSectionContainer>
          </InfoSection>

          <InfoSection>
            <InfoSectionContainer>
              <InfoSectionInner>
                <HeaderTitle>출연/제작</HeaderTitle>
              </InfoSectionInner>
            </InfoSectionContainer>
          </InfoSection>
        </TopRoundedContent>
      </Content>
    </ContentContainer>
  );
};

export default DetailContentTopSection;