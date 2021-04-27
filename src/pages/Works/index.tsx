import React from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import Panel from 'components/molecules/Panel';
import CategoryContextProvider from 'components/molecules/CategoryContextProvider';
import WorkSection from 'components/organisms/WorkSection';
import Footer from 'components/organisms/Footer';

const Main = styled.main`
  margin-top: 3.5rem;
  width: 100%;
  background-color: #fff;
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

  console.log('Works component rendering');

  return (
    <CategoryContextProvider>
      <Main>
        <WorkSection
          mediaType={mediaType}
          showCategory={ShowCategory}
          movieCategory={MovieCategory}
        >
          <Panel
            mediaType={mediaType}
            showCategory={ShowCategory}
            movieCategory={MovieCategory}
          />
        </WorkSection>
        <Footer />
      </Main>
    </CategoryContextProvider>
  );
}

export default Movies;
