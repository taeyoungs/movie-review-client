import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Loading from 'products/Loading';
import WorkItem from 'components/molecules/WorkItem';
import { GET_PERSON_CREDITS_QUERY, GET_PERSON_QUERY } from 'queries/Query';
import { IPersonProps, IWorkProps } from 'models/types';
import { ColorPalette } from 'models/color';

const Main = styled.main`
  padding-top: 3.5rem;
  padding-bottom: 56px;
  @media (min-width: 720px) {
    padding-bottom: unset;
  }
`;

const PersonSection = styled.section`
  background-color: #fff;
  @media (min-width: 720px) {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 3.5rem);
  }
`;

const PersonSectionContainer = styled.div`
  @media (min-width: 720px) {
    flex: 1;
  }
`;

const MobileSizeHeader = styled.header`
  display: none;
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
  margin: 4px 0 20px;
  @media (min-width: 720px) {
    margin: 22px 0 20px;
  }
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

const WorkList = styled.ul`
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

const Person: React.FunctionComponent = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const { loading: personLoading, data: personData } = useQuery<{
    getPerson: IPersonProps;
  }>(GET_PERSON_QUERY, {
    variables: {
      personId: location.pathname.split('/')[2],
    },
  });

  const { loading: creditLoading, data: creditData } = useQuery<{
    getPersonCredits: IWorkProps[];
  }>(GET_PERSON_CREDITS_QUERY, {
    variables: {
      personId: location.pathname.split('/')[2],
      page,
    },
  });

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('.lazy');

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            const src = image.getAttribute('data-src');
            if (src) {
              image.setAttribute('src', src);
              image.setAttribute('style', 'opacity: 1');
            }
            image.classList.remove('lazy');
            imageObserver.unobserve(image);
          }
        });
      });

      lazyImages.forEach((img) => imageObserver.observe(img));
    }
  }, []);

  return (
    <Main>
      {personLoading && creditLoading ? (
        <Loading />
      ) : (
        personData &&
        creditData && (
          <PersonSection>
            <PersonSectionContainer>
              <MobileSizeHeader></MobileSizeHeader>
              <PersonSectionInner>
                <PersonInfoSection>
                  <Container>
                    <PersonInfoInner>
                      <PersonPosterBlock>
                        <PersonPoster>
                          <Poster
                            url={personData.getPerson.profile_path}
                            name={personData.getPerson.name}
                          />
                        </PersonPoster>
                      </PersonPosterBlock>
                      <PersonContentBlock>
                        <h1>{personData.getPerson.name}</h1>
                        <p>{personData.getPerson.known_for_department}</p>
                      </PersonContentBlock>
                    </PersonInfoInner>
                  </Container>
                </PersonInfoSection>
                <Border />
                <Container>
                  <WorkList>
                    {creditData.getPersonCredits.map((credit, index) => (
                      <WorkItemContainer key={credit.id}>
                        <WorkItem
                          work={credit}
                          mediaType={credit.media_type || 'movie'}
                          isLazy={index > 9 ? true : false}
                        />
                      </WorkItemContainer>
                    ))}
                  </WorkList>
                </Container>
              </PersonSectionInner>
            </PersonSectionContainer>
          </PersonSection>
        )
      )}
    </Main>
  );
};

export default Person;
