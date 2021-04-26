import React from 'react';
import styled from '@emotion/styled';
import { IMovieProps } from 'models/types';
import { useLocation } from 'react-router';
import PosterCard from 'components/molecules/PosterCard';

const Container = styled.div`
  width: 100%;
  @media (min-width: 720px) {
    max-width: 1040px;
  }
`;

const WorkContainerInner = styled.div`
  @media (min-width: 720px) {
    padding-left: 20px;
  }
`;

const Work = styled.section`
  width: 100%;
  display: block;
`;

const WorkSectionInner = styled.div``;

const WorkList = styled.ul`
  overflow: hidden;
`;

const WorkItem = styled.li`
  vertical-align: top;
  display: inline-block;
  padding: 0 5px;
  margin: 0 0 24px;
  width: calc(100% / 3);
  @media (min-width: 720px) {
    width: 50%;
  }
  @media (min-width: 930px) {
    width: calc(100% / 3);
  }
  @media (min-width: 1160px) {
    width: 25%;
  }
  @media (min-width: 1440px) {
    width: 20%;
  }
`;

interface IProps {
  works: Array<IMovieProps>;
}

function WorkContainer({ works }: IProps): JSX.Element {
  const location = useLocation();
  const mediaType = location.pathname.split('/')[1];

  return (
    <Container>
      <WorkContainerInner>
        <Work>
          <WorkSectionInner>
            <WorkList>
              {works.map((work) => (
                <WorkItem key={work.id}>
                  <PosterCard {...work} href={`/${mediaType}/${work.id}`} />
                </WorkItem>
              ))}
            </WorkList>
          </WorkSectionInner>
        </Work>
      </WorkContainerInner>
    </Container>
  );
}

export default React.memo(WorkContainer);
