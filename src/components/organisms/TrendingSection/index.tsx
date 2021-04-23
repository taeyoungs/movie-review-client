import React, { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  HomeScrollSection,
  ScrollDiv,
  SectionInner,
  ScrollDivContainer,
  ScrollItem,
} from 'pages/Home/WithEmotion';
import Loading from 'products/Loading';
import PosterCard from 'components/molecules/PosterCard';
import { GET_TRENDING_QUERY } from 'queries/Query';
import { IMovieProps } from 'models/types';
import { HiddenBox, ToggleBtn, ToggleText } from './WithEmotion';

const Trending: React.FunctionComponent = () => {
  const [options, setOptions] = useState({
    mediaType: 'movie',
    timeWindow: 'day',
  });
  const [getTrending, { loading, data }] = useLazyQuery<{
    getTrending: Array<IMovieProps>;
  }>(GET_TRENDING_QUERY);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('.lazy');
      const trendingTitle = document.querySelector('.trending--title');

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const $el = entry.target;
            const dataSrc = $el.getAttribute('data-src');
            if (dataSrc) {
              $el.setAttribute('src', dataSrc);
              $el.setAttribute('style', 'opacity: 1');
              $el.classList.remove('lazy');
            }
            if ($el.classList.contains('trending--title')) {
              getTrending({
                variables: {
                  mediaType: options.mediaType,
                  timeWindow: options.timeWindow,
                },
              });
            }
            imageObserver.unobserve($el);
          }
        });
      });

      lazyImages.forEach((image) => {
        imageObserver.observe(image);
      });
      if (trendingTitle) {
        imageObserver.observe(trendingTitle);
      }
    }
  }, []);

  const handleToggleOptions = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      let value = '';
      if (name === 'mediaType') value = checked ? 'tv' : 'movie';
      else value = checked ? 'week' : 'day';

      setOptions((options) => {
        getTrending({
          variables: {
            ...options,
            [name]: value,
          },
        });
        return {
          ...options,
          [name]: value,
        };
      });
    },
    []
  );

  return (
    <HomeScrollSection>
      <SectionInner>
        <h2>
          <span className="trending--title">트렌딩</span>
          <HiddenBox
            type="checkbox"
            name="mediaType"
            id="media-type"
            onChange={handleToggleOptions}
          />
          <ToggleBtn htmlFor="media-type">
            <ToggleText>영화</ToggleText>
            <ToggleText>TV</ToggleText>
          </ToggleBtn>
          <HiddenBox
            type="checkbox"
            name="timeWindow"
            id="time-window"
            onChange={handleToggleOptions}
          />
          <ToggleBtn htmlFor="time-window">
            <ToggleText>오늘</ToggleText>
            <ToggleText>이번 주</ToggleText>
          </ToggleBtn>
        </h2>
        <ScrollDivContainer>
          <ScrollDiv>
            {loading ? (
              <Loading />
            ) : (
              data &&
              data.getTrending.map((work) => (
                <ScrollItem key={work.id}>
                  <PosterCard
                    {...work}
                    isDark
                    href={`/${options.mediaType}/${work.id}`}
                  />
                </ScrollItem>
              ))
            )}
          </ScrollDiv>
        </ScrollDivContainer>
      </SectionInner>
    </HomeScrollSection>
  );
};

export default Trending;
