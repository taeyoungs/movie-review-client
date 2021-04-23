import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Main,
  Container,
  GridContainer,
  HomeScrollSection,
  ScrollDiv,
  SectionInner,
  ScrollItem,
  ScrollDivContainer,
} from './WithEmotion';
import ActiveIndexContextProvider from 'components/molecules/ActiveIndexContextProvider';
import PosterCard from 'components/molecules/PosterCard';
import Swiper from 'components/organisms/Swiper';
import SideSlideSection from 'components/organisms/SideSlideSection';
import TrendingSection from 'components/organisms/TrendingSection';
import Footer from 'components/organisms/Footer';
import Loading from 'products/Loading';
import { POPULAR_MOVIES_QUERY, POPULAR_SHOWS_QUERY } from 'queries/Query';
import { IMovieProps, IShowProps } from 'models/types';

const Home: React.FunctionComponent = () => {
  const { loading: showLoading, data: showData } = useQuery<{
    shows: Array<IShowProps>;
  }>(POPULAR_SHOWS_QUERY, {
    variables: { page: 1 },
  });
  const { loading: movieLoading, data: movieData } = useQuery<{
    movies: Array<IMovieProps>;
  }>(POPULAR_MOVIES_QUERY, {
    variables: { page: 1 },
  });

  return (
    <ActiveIndexContextProvider>
      <Main role="main">
        {showLoading && movieLoading ? (
          <Loading />
        ) : (
          showData &&
          movieData && (
            <>
              <Container>
                <GridContainer>
                  <Swiper shows={showData.shows.slice(0, 9)} />
                  <SideSlideSection shows={showData.shows.slice(0, 9)} />
                </GridContainer>
              </Container>
              <HomeScrollSection>
                <SectionInner>
                  <h2>박스오피스</h2>
                  <ScrollDivContainer>
                    <ScrollDiv>
                      {movieData.movies.map((movie, index) => (
                        <ScrollItem key={movie.id}>
                          <PosterCard
                            {...movie}
                            isDark
                            href={`/movie/${movie.id}`}
                            lazy={index > 7 ? true : false}
                          />
                        </ScrollItem>
                      ))}
                    </ScrollDiv>
                  </ScrollDivContainer>
                </SectionInner>
              </HomeScrollSection>
              <TrendingSection />
              <Footer />
            </>
          )
        )}
      </Main>
    </ActiveIndexContextProvider>
  );
};

export default Home;
