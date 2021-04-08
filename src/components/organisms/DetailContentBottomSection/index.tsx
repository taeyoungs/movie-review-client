import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ISimilarWorkProps } from 'models/types';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';

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

const BottomRoundedContent = styled.div`
  background-color: #fff;
  overflow: hidden;
  @media (min-width: 1024px) {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
`;

const WorksSection = styled.section`
  padding: 8px 0 0;
  margin-botton: 0px;
  @media (min-width: 720px) {
    margin-bottom: 30px;
  }
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

const WorkList = styled.ul`
  margin: 14px -5px 0px;
  overflow: hidden;
`;

const WorkItem = styled.li`
  display: inline-block;
  vertical-align: top;
  padding: 0 5px;
  margin: 0 0 24px;
  width: calc(100% / 3);
  @media (min-width: 720px) {
    width: 25%;
  }
`;

const WorkLink = styled(Link)`
  width: 100%;
  display: inline-block;
  color: #000;
`;

const WorkPosterPadding = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
  padding-bottom: 145.37%;
`;

const WorkPosterWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  background-color: #f0f0f0;
  transition: 300ms;
`;

const Poster = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  vertical-align: top;
  opacity: 0;
`;

const WorkInfo = styled.div`
  text-align: left;
  width: calc(100% - 10px);
  margin: 5px 10px 0 0;
`;

const WorkTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${ColorPalette.Main.TEXT_BODY};
  letter-spacing: -0.3px;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WorkVote = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #787878;
  letter-spacing: -0.2px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  height: 18px;
  text-overflow: ellipsis;
  @media (min-width: 720px) {
    margin-top: 2px;
  }
`;

const WorkType = styled.div`
  color: #a0a0a0;
  font-size: 12px;
  letter-spacing: -0.2px;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 1px;
  text-overflow: ellipsis;
`;

interface IProps {
  similarWorks: ISimilarWorkProps[];
  mediaType: string;
}

const DetailContentBottomSection: React.FC<IProps> = ({
  similarWorks,
  mediaType,
}) => {
  return (
    <ContentContainer>
      <BottomRoundedContent>
        <WorksSection>
          <InfoSectionContainer>
            <InfoSectionInner>
              <HeaderTitle>비슷한 작품</HeaderTitle>
            </InfoSectionInner>
          </InfoSectionContainer>
          <InfoSectionContainer>
            <InfoSectionInner>
              <WorkList>
                {similarWorks.map((work) => (
                  <WorkItem key={work.id}>
                    <WorkLink to={{ pathname: `/${mediaType}/${work.id}` }}>
                      <WorkPosterPadding>
                        <WorkPosterWrapper>
                          {work.poster_path && (
                            <Poster
                              alt={work.title}
                              className="lazy"
                              data-src={`https://image.tmdb.org/t/p/w500${work.poster_path}`}
                            />
                          )}
                        </WorkPosterWrapper>
                      </WorkPosterPadding>
                      <WorkInfo>
                        <WorkTitle>{work.title}</WorkTitle>
                        <div>
                          <WorkVote>
                            <Icon icon="star" color="#f1c40f" size={14} />
                            &nbsp;{work.vote_average}
                          </WorkVote>
                          <WorkType>
                            {mediaType === 'movie' ? '영화' : 'TV 프로그램'}
                          </WorkType>
                        </div>
                      </WorkInfo>
                    </WorkLink>
                  </WorkItem>
                ))}
              </WorkList>
            </InfoSectionInner>
          </InfoSectionContainer>
        </WorksSection>
      </BottomRoundedContent>
    </ContentContainer>
  );
};

export default DetailContentBottomSection;
