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
import { GET_WORKS_QUERY } from 'queries/Query';
import { IMovieProps } from 'models/types';

const Home: React.FunctionComponent = () => {
  const { loading: showLoading, data: showData } = useQuery<{
    works: Array<IMovieProps>;
  }>(GET_WORKS_QUERY, {
    variables: { page: 1, mediaType: 'tv', contentType: 'popular' },
  });
  const { loading: movieLoading, data: movieData } = useQuery<{
    works: Array<IMovieProps>;
  }>(GET_WORKS_QUERY, {
    variables: { page: 1, mediaType: 'movie', contentType: 'popular' },
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
                  <Swiper shows={showData.works.slice(0, 9)} />
                  <SideSlideSection shows={showData.works.slice(0, 9)} />
                </GridContainer>
              </Container>
              <HomeScrollSection>
                <SectionInner>
                  <h2>박스오피스</h2>
                  <ScrollDivContainer>
                    <ScrollDiv>
                      {movieData.works.map((movie, index) => (
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
