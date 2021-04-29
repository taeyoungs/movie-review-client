import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import DetailVideo from 'components/molecules/DetailVideo';
import VideoItem from 'components/molecules/VideoItem';
import GridInner from 'components/molecules/GridInner';
import ListArrowBtnBlock from 'components/molecules/ListArrowBtnBlock';
import useListTransform from 'hooks/useListTransform';
import { IDetailProps } from 'models/types';

const VideoContainer = styled.div`
  @media (min-width: 720px) {
    float: left;
    width: 100%;
  }
  @media (min-width: 1024px) {
    float: right;
    width: 320px;
    padding: 0 8px;
  }
`;

const MiddleRoundedContent = styled.div`
  background-color: #fff;
  overflow: hidden;
  @media (min-width: 720px) and (max-width: 1024px) {
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
  @media (min-width: 1024px) {
    border: 1px solid #e5e5e5;
    border-radius: 6px;
  }
`;

const VideoListSection = styled.section`
  padding: 8px 0 0;
`;

const VideoListContainer = styled.div`
  position: relative;
  &:hover .arrow-button {
    opacity: 1;
  }
`;

const VideoListExposure = styled.div`
  overflow: hidden;
  padding: 0 5px;
  margin: 0 -5px;
`;

const VideoSwiper = styled.div`
  transition: 500ms;
`;

const VideoList = styled.ul`
  white-space: nowrap;
  margin: 5px -5px 24px;
`;

const DivideBorder = styled.hr`
  border: 0;
  border-bottom: 1px solid #f0f0f0;
  margin: 20px 0 0;
`;

const EmptyVideo = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  movie: IDetailProps;
}

const DetailContentMiddleSection: React.FC<IProps> = ({ movie }) => {
  const {
    state,
    ulElementRef,
    setInitialSize,
    handleSwipe,
  } = useListTransform([2, 4, 2]);
  const { transformWidth, currentListSize } = state;

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setInitialSize(2);
    } else if (window.innerWidth < 1024 && window.innerWidth >= 720) {
      setInitialSize(4);
    } else {
      setInitialSize(2);
    }

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
    <VideoContainer>
      <DetailVideo
        type={0}
        videoUrl={movie.videos.length > 0 ? movie.videos[0].key : null}
        name={movie.videos.length > 0 ? movie.videos[0].name : null}
      />
      <MiddleRoundedContent>
        <GridInner>
          <DetailVideo
            type={1}
            videoUrl={movie.videos.length > 0 ? movie.videos[0].key : null}
            name={movie.videos.length > 0 ? movie.videos[0].name : null}
          />
          <DetailVideo
            type={2}
            videoUrl={movie.videos.length > 0 ? movie.videos[0].key : null}
            name={movie.videos.length > 0 ? movie.videos[0].name : null}
          />
        </GridInner>
        <VideoListSection>
          <GridInner title>동영상</GridInner>
          <VideoListContainer>
            <VideoListExposure>
              <VideoSwiper
                style={{
                  transform: `translateX(-${transformWidth}px)`,
                }}
              >
                <GridInner>
                  <VideoList ref={ulElementRef}>
                    {movie.videos.map((video) => (
                      <VideoItem key={video.id} video={video} />
                    ))}
                    {movie.videos.length === 0 && (
                      <EmptyVideo>등록된 동영상이 없습니다. 😳</EmptyVideo>
                    )}
                  </VideoList>
                </GridInner>
              </VideoSwiper>
            </VideoListExposure>
            <ListArrowBtnBlock
              transformWidth={transformWidth}
              handleSwipe={handleSwipe}
              contentsLen={movie.videos.length}
              currentListSize={currentListSize}
            />
          </VideoListContainer>
          <GridInner>
            <DivideBorder />
          </GridInner>
        </VideoListSection>
      </MiddleRoundedContent>
    </VideoContainer>
  );
};

export default DetailContentMiddleSection;
