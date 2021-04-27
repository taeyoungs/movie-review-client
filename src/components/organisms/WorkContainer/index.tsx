import React, { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import PosterCard from 'components/molecules/PosterCard';
import useMoreWorks from 'hooks/useMoreWorks';
import useCategoryState from 'hooks/useCategoryState';
import { IMovieProps } from 'models/types';
import Icon from 'Icon/Icon';

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

const LoadingScrollBlock = styled.div`
  display: block;
  text-align: center;
  height: 1px;
  margin: 0 auto;
  min-height: 1px;
`;

interface IProps {
  works: Array<IMovieProps>;
  totalPage: number;
  pageRef: React.MutableRefObject<number>;
}

const WorkListItem = React.memo(function WorkListItem({
  work,
  mediaType,
}: {
  work: IMovieProps;
  mediaType: string;
}) {
  return (
    <WorkItem>
      <PosterCard {...work} href={`/${mediaType}/${work.id}`} />
    </WorkItem>
  );
});

function WorkContainer({ works, totalPage, pageRef }: IProps): JSX.Element {
  const location = useLocation();
  const mediaType = location.pathname.split('/')[1];
  const state = useCategoryState();
  const loadingRef = useRef<HTMLDivElement>(null);

  const { mutate, loading } = useMoreWorks({
    page: pageRef.current,
    mediaType,
    contentType: state.category,
  });

  const handleLazyload = useCallback(() => {
    const scrollTop = window.pageYOffset;
    if (loadingRef.current) {
      if (loadingRef.current.offsetTop < window.innerHeight + scrollTop) {
        if (totalPage > pageRef.current + 1) {
          if (!loading) {
            mutate();
            pageRef.current += 1;
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const documentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (totalPage > pageRef.current + 1) {
              if (!loading) {
                mutate();
                pageRef.current += 1;
              }
            } else {
              documentObserver.unobserve(entry.target);
            }
          }
        });
      });

      if (loadingRef.current) {
        documentObserver.observe(loadingRef.current);
      }
    } else {
      document.addEventListener('scroll', handleLazyload);
      window.addEventListener('resize', handleLazyload);
      window.addEventListener('orientationChange', handleLazyload);

      return () => {
        document.removeEventListener('scroll', handleLazyload);
        window.removeEventListener('resize', handleLazyload);
        window.removeEventListener('orientationChange', handleLazyload);
      };
    }
  }, []);

  return (
    <Container>
      <WorkContainerInner>
        <Work>
          <WorkSectionInner>
            <WorkList>
              {works.map((work) => (
                <WorkListItem key={work.id} work={work} mediaType={mediaType} />
              ))}
            </WorkList>
          </WorkSectionInner>
        </Work>
        <LoadingScrollBlock ref={loadingRef}>
          {loading && <Icon icon="spinner" size={30} />}
        </LoadingScrollBlock>
      </WorkContainerInner>
    </Container>
  );
}

export default React.memo(WorkContainer);
