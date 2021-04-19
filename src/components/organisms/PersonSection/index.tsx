import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import WorkItem from 'components/molecules/WorkItem';
import useMoreCredits from 'hooks/useMoreCredits';
import { IPersonProps, IWorkProps } from 'models/types';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';

const Section = styled.section`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  @media (min-width: 720px) {
    min-height: calc(100vh - 3.5rem);
  }
`;

const PersonSectionContainer = styled.div`
  flex: 1;
`;

const PersonSectionInner = styled.div`
  max-width: 1320px;
  margin-right: 15px;
  margin-left: 15px;
  @media (min-width: 720px) {
    margin-bottom: 55px;
  }
  @media (min-width: 760px) {
    margin-right: 3.5%;
    margin-left: 3.5%;
  }
  @media (min-width: 1100px) {
    margin-right: 60px;
    margin-left: 60px;
  }
  @media (min-width: 1440px) {
    margin-right: auto;
    margin-left: auto;
  }
`;

const PersonInfoSection = styled.section`
  margin: 22px 0 20px;
`;

const Border = styled.hr`
  border: 0;
  border-bottom: 1px solid #e5e5e5;
`;

const Container = styled.div`
  display: block;
`;

const PersonInfoInner = styled.div`
  display: flex;
  align-items: center;
  min-height: 84px;
`;

const PersonPosterBlock = styled.div`
  text-align: left;
  margin-right: 15px;
`;

const PersonPoster = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 84px;
  height: 84px;
  overflow: hidden;
  position: relative;
`;

const Poster = styled.div<{ url?: string; name: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  ${(props) =>
    props.url
      ? `
    background-image: url(https://image.tmdb.org/t/p/w500${props.url});
    background-size: cover;
    background-position: center;
  `
      : `
    background-color: #f0f0f0;
    &:before {
        content: '${props.name}';
        font-size: 15px;
        position: absolute;
        inset: 0;
        text-align: center;
        display: flex;
        align-items: center;
        line-height: 20px;
        white-space: pre-wrap;
        overflow: hidden;
        color: #808080;
    }
  `}
`;

const WorkListContainer = styled.ul`
  margin: 22px -5px 0;
  overflow: hidden;
`;

const WorkItemContainer = styled.li`
  padding: 0 5px;
  margin: 0 0 24px;
  display: inline-block;
  width: calc(100% / 3);
  @media (min-width: 520px) {
    width: 25%;
  }
  @media (min-width: 680px) {
    width: 20%;
  }
  @media (min-width: 840px) {
    width: calc(100% / 6);
  }
  @media (min-width: 960px) {
    width: calc(100% / 7);
  }
  @media (min-width: 1100px) {
    width: 12.5%;
  }
  @media (min-width: 1200px) {
    width: calc(100% / 9);
  }
`;

const PersonContentBlock = styled.div`
  & h1 {
    font-size: 19px;
    font-weight: 700;
    color: ${ColorPalette.Main.TEXT_BODY};
    line-height: 20px;
    letter-spacing: -0.5px;
  }
  & p {
    color: #808080;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.2px;
    margin-top: 4px;
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
  credits: IWorkProps[];
  totalCount: number;
  person: IPersonProps;
}

const PersonSection: React.FC<IProps> = ({ credits, totalCount, person }) => {
  const [page, setPage] = useState(1);
  const loadingRef = useRef<HTMLDivElement>(null);

  const { mutate, loading } = useMoreCredits({
    personId: `${person.id}`,
    page,
  });

  function handleLazyload() {
    const scrollTop = window.pageYOffset;
    if (loadingRef.current) {
      if (loadingRef.current.offsetTop < window.innerHeight + scrollTop) {
        const page = loadingRef.current.getAttribute('data-page');
        if (page && totalCount > (+page + 1) * 9) {
          if (!loading) {
            mutate();
            setPage((prevState) => prevState + 1);
          }
        }
      }
    }
  }

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const documentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const $el = entry.target;
            const page = $el.getAttribute('data-page');
            if (page) {
              if (totalCount > (+page + 1) * 9) {
                if (!loading) {
                  mutate();
                  setPage((prevState) => prevState + 1);
                }
              } else {
                documentObserver.unobserve(entry.target);
              }
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
    <Section>
      <PersonSectionContainer>
        <PersonSectionInner>
          <PersonInfoSection>
            <Container>
              <PersonInfoInner>
                <PersonPosterBlock>
                  <PersonPoster>
                    <Poster url={person.profile_path} name={person.name} />
                  </PersonPoster>
                </PersonPosterBlock>
                <PersonContentBlock>
                  <h1>{person.name}</h1>
                  <p>{person.known_for_department}</p>
                </PersonContentBlock>
              </PersonInfoInner>
            </Container>
          </PersonInfoSection>
          <Border />
          <Container>
            <WorkListContainer>
              {credits.map((credit) => (
                <WorkItemContainer key={credit.id}>
                  <WorkItem
                    work={credit}
                    mediaType={credit.media_type || 'movie'}
                    isLazy={false}
                  />
                </WorkItemContainer>
              ))}
            </WorkListContainer>
          </Container>
          <LoadingScrollBlock ref={loadingRef} data-page={page}>
            {loading && <Icon icon="spinner" size={30} />}
          </LoadingScrollBlock>
        </PersonSectionInner>
      </PersonSectionContainer>
    </Section>
  );
};

export default PersonSection;
