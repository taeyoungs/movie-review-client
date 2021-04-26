import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'Icon/Icon';
import { useLazyQuery } from '@apollo/client';
import { IMovieProps } from 'models/types';
import { GET_WORKS_QUERY } from 'queries/Query';
import { useLocation } from 'react-router';
import Loading from 'products/Loading';
import PosterCard from 'components/molecules/PosterCard';

const Main = styled.main`
  margin-top: 3.5rem;
  width: 100%;
  background-color: #fff;
`;

const Section = styled.section`
  width: 100%;
  min-height: calc(100vh - 3.5rem);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 3.5%;
`;

const ContainerInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 0;
`;

const Category = styled.div`
  width: 100%;
  & h1 {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 720px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const CategoryPanelContainer = styled.div`
  margin-bottom: 20px;
  @media (min-width: 720px) {
    margin-bottom: 0;
  }
`;

const CategoryPanel = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  width: 100%;
  @media (min-width: 720px) {
    width: 240px;
  }
`;

const CategoryPanelInner = styled.div<{ panel: boolean }>`
  padding: 15px;
  &:first-of-type {
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
  }
  ${(props) =>
    !props.panel &&
    `
    &:nth-of-type(2) {
      display: none;
    }
  `}
`;

const PanelTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h2 {
    font-weight: 700;
    font-size: 18px;
  }
`;

const PanelArrow = styled.div<{ panel: boolean }>`
  display: flex;
  transition: transform 200ms ease-in-out;
  transform: rotate(90deg);
  ${(props) =>
    !props.panel &&
    `
    transform: rotate(0deg);
  `}
`;

const PanelList = styled.ul`
  line-height: 22px;
  letter-spacing: -0.2px;
`;

const PanelItem = styled.li<{ selected: boolean }>`
  padding: 5px 0px 5px 8px;
  margin-bottom: 5px;
  cursor: pointer;
  ${(props) =>
    props.selected &&
    `
    border-radius: 4px;
    background-color: #ffe16e;
  `}
  &:hover {
    border-radius: 4px;
    background-color: #ffe16e;
  }
`;

const WorkContainer = styled.div`
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

const WorkSection = styled.section`
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

const MovieCategory: { [key: string]: string } = {
  popular: '인기 영화',
  now_playing: '현재 상영 중인 영화',
  upcoming: '개봉 예정 영화',
  top_rated: '높은 평점의 인기 영화',
};

const ShowCategory: { [key: string]: string } = {
  popular: '인기 TV 프로그램',
  airing_today: '오늘 방영할 TV 프로그램',
  on_the_air: '현재 방영 중인 TV 프로그램',
  top_rated: '높은 평점의 TV 프로그램',
};

function Movies(): JSX.Element {
  const location = useLocation();
  const mediaType = location.pathname.split('/')[1];
  const [panel, setPanel] = useState(true);
  const [contentType, setContentType] = useState('popular');
  const pageRef = useRef(1);

  const [getWorks, { loading, data }] = useLazyQuery<{
    works: Array<IMovieProps>;
  }>(GET_WORKS_QUERY, {
    variables: { page: pageRef.current, mediaType, contentType },
  });

  useEffect(() => {
    pageRef.current = 1;
    getWorks();
  }, []);

  const handlePanelToggle = useCallback(() => {
    setPanel((panel) => !panel);
  }, []);

  const handleCategory: React.MouseEventHandler<HTMLUListElement> = (e) => {
    if (e.target instanceof HTMLElement && e.target.tagName === 'LI') {
      const category = e.target.dataset.category;
      if (category) {
        setContentType(category);
      }
    }
  };

  return (
    <Main>
      <Section>
        <Container>
          <ContainerInner>
            <Category>
              <h1>
                {mediaType === 'movie'
                  ? MovieCategory[contentType]
                  : ShowCategory[contentType]}
              </h1>
            </Category>
            <Content>
              <CategoryPanelContainer>
                <CategoryPanel>
                  <CategoryPanelInner onClick={handlePanelToggle} panel={panel}>
                    <PanelTitle>
                      <h2>카테고리</h2>
                      <PanelArrow panel={panel}>
                        <Icon icon="arrowRight" color="#000" size={12} />
                      </PanelArrow>
                    </PanelTitle>
                  </CategoryPanelInner>
                  <CategoryPanelInner panel={panel}>
                    {mediaType === 'movie' ? (
                      <PanelList onClick={handleCategory}>
                        {Object.entries(MovieCategory).map(function (
                          [key, value],
                          index
                        ) {
                          return (
                            <PanelItem
                              key={index}
                              data-category={key}
                              selected={key === contentType}
                            >
                              {value}
                            </PanelItem>
                          );
                        })}
                      </PanelList>
                    ) : (
                      <PanelList onClick={handleCategory}>
                        {Object.entries(ShowCategory).map(function (
                          [key, value],
                          index
                        ) {
                          return (
                            <PanelItem
                              key={index}
                              data-category={key}
                              selected={key === contentType}
                            >
                              {value}
                            </PanelItem>
                          );
                        })}
                      </PanelList>
                    )}
                  </CategoryPanelInner>
                </CategoryPanel>
              </CategoryPanelContainer>
              {loading ? (
                <Loading />
              ) : (
                data && (
                  <WorkContainer>
                    <WorkContainerInner>
                      <WorkSection>
                        <WorkSectionInner>
                          <WorkList>
                            {data.works.map((work) => (
                              <WorkItem key={work.id}>
                                <PosterCard
                                  {...work}
                                  href={`/${mediaType}/${work.id}`}
                                />
                              </WorkItem>
                            ))}
                          </WorkList>
                        </WorkSectionInner>
                      </WorkSection>
                    </WorkContainerInner>
                  </WorkContainer>
                )
              )}
            </Content>
          </ContainerInner>
        </Container>
      </Section>
    </Main>
  );
}

export default Movies;
