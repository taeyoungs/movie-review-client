import React from 'react';
import styled from '@emotion/styled';
import GridInner from 'components/molecules/GridInner';
import WorkItem from 'components/molecules/WorkItem';
import { IWorkProps } from 'models/types';

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
  @media (min-width: 720px) and (max-width: 1024px) {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
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

const WorkList = styled.ul`
  margin: 14px -5px 0px;
  overflow: hidden;
`;

const WorkItemContainer = styled.li`
  display: inline-block;
  vertical-align: top;
  padding: 0 5px;
  margin: 0 0 24px;
  width: calc(100% / 3);
  @media (min-width: 720px) {
    width: 25%;
  }
`;

interface IProps {
  similarWorks: IWorkProps[];
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
          <GridInner title>비슷한 작품</GridInner>
          <GridInner>
            <WorkList>
              {similarWorks.map((work) => (
                <WorkItemContainer key={work.id}>
                  <WorkItem work={work} mediaType={mediaType} />
                </WorkItemContainer>
              ))}
            </WorkList>
          </GridInner>
        </WorksSection>
      </BottomRoundedContent>
    </ContentContainer>
  );
};

export default DetailContentBottomSection;
