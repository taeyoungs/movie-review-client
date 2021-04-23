import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import DetailVideo from 'components/molecules/DetailVideo';
import VideoItem from 'components/molecules/VideoItem';
import GridInner from 'components/molecules/GridInner';
import { IDetailProps } from 'models/types';
import Icon from 'Icon/Icon';

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

const ArrowButtonBlock = styled.div<{ dir: string; displayNone: boolean }>`
  display: flex;
  height: 100%;
  align-items: center;
  transition: opacity 300ms ease;
  position: absolute;
  opacity: 0;
  top: 0;
  ${(props) =>
    props.dir === 'left' &&
    `
    
    left: 10px;
    & div {
      transform: rotate(-180deg);
    }
  `}
  ${(props) => props.dir === 'left' && props.displayNone && 'display: none'}
  ${(props) =>
    props.dir === 'right' &&
    `
    right: 10px;
  `}
  ${(props) => props.dir === 'right' && props.displayNone && 'display: none'}
`;

const ArrowButton = styled.div`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background-color: #fff;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const [transformWidth, setTransformWidth] = useState(0);
  const [listSize, setListSize] = useState(0);
  const videoListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setListSize(2);
    } else if (window.innerWidth < 1024 && window.innerWidth >= 720) {
      setListSize(4);
    } else {
      setListSize(2);
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

    // window.addEventListener('resize', () => {
    //   setTransformWidth(0);
    //   if (window.innerWidth >= 1024) {
    //     setListSize(2);
    //   } else if (window.innerWidth < 1024 && window.innerWidth >= 720) {
    //     setListSize(4);
    //   } else {
    //     setListSize(2);
    //   }
    // });

    // return () => {
    //   window.removeEventListener('resize', () => {
    //     setTransformWidth(0);
    //     if (window.innerWidth >= 1024) {
    //       setListSize(2);
    //     } else if (window.innerWidth < 1024 && window.innerWidth >= 720) {
    //       setListSize(4);
    //     } else {
    //       setListSize(2);
    //     }
    //   });
    // };
  }, []);

  const handleSwipe: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      let width = 0;
      if (videoListRef.current) {
        width = videoListRef.current.clientWidth;
      }
      if (e.currentTarget.parentElement) {
        const dir = e.currentTarget.parentElement.getAttribute('dir');
        if (dir === 'left') {
          setTransformWidth((prevState) => prevState - width);
          if (window.innerWidth >= 1024) {
            setListSize((prevState) => prevState - 2);
          } else if (window.innerWidth < 1024 && window.innerWidth >= 720) {
            setListSize((prevState) => prevState - 4);
          } else {
            setListSize((prevState) => prevState - 2);
          }
        }
        if (dir === 'right') {
          setTransformWidth((prevState) => prevState + width);
          if (window.innerWidth >= 1024) {
            setListSize((prevState) => prevState + 2);
          } else if (window.innerWidth < 1024 && window.innerWidth >= 720) {
            setListSize((prevState) => prevState + 4);
          } else {
            setListSize((prevState) => prevState + 2);
          }
        }
      }
    },
    []
  );

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
                  <VideoList ref={videoListRef}>
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
            <ArrowButtonBlock
              dir="left"
              className="arrow-button"
              displayNone={transformWidth === 0}
            >
              <ArrowButton onClick={handleSwipe}>
                <Icon icon="arrowRight" size={16} />
              </ArrowButton>
            </ArrowButtonBlock>
            <ArrowButtonBlock
              dir="right"
              className="arrow-button"
              displayNone={movie.videos.length <= listSize}
            >
              <ArrowButton onClick={handleSwipe}>
                <Icon icon="arrowRight" size={16} />
              </ArrowButton>
            </ArrowButtonBlock>
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
