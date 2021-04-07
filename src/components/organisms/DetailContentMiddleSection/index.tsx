import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import DetailVideo from 'components/molecules/DetailVideo';
import { IMovieProps } from 'models/types';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';

interface IProps {
  movie: IMovieProps;
}

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
  @media (min-width: 1024px) {
    border: 1px solid #e5e5e5;
    border-radius: 6px;
  }
  background-color: #fff;
  overflow: hidden;
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

const VideoListItem = styled.li`
  display: inline-block;
  padding: 0 5px;
  vertical-align: top;
  width: 100%;
  @media (min-width: 720px) {
    width: 25%;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const VideoThumbnailContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #e5e5e5;
  border-radius: 3px;
  padding-bottom: 56.25%;
`;

const VideoThumbnail = styled.span<{ url: string }>`
  position: absolute;
  display: inline-block;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  inset: 0;
  background-size: cover;
`;

const ThumnailBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const VideoTitleContainer = styled.div`
  font-size: 12px;
  letter-spacing: -0.4px;
  line-height: 20px;
  color: ${ColorPalette.Main.TEXT_BODY};
`;

const VideoTitleWrapper = styled.div`
  word-break: break-all;
  overflow: hidden;
  max-height: 50px;
  margin: 0;
`;

const VideoTitle = styled.div`
  white-space: pre-wrap;
`;

const InfoSectionContainer = styled.div`
  display: block;
`;

const InfoSectionInner = styled.div`
  margin: 0 20px;
`;

const HeaderTitle = styled.h2`
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.7px;
  line-height: 28px;
  margin: 8px 0;
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
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailContentMiddleSection: React.FC<IProps> = ({ movie }) => {
  const [transformWidth, setTransformWidth] = useState(0);
  const [listSize, setListSize] = useState(0);
  const videoListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (movie) {
      if (window.innerWidth >= 1024) {
        setListSize(2);
      } else if (window.innerWidth < 1024 && window.innerWidth >= 720) {
        setListSize(4);
      } else {
        setListSize(2);
      }
    }
  }, [movie]);

  const handleSwipe: React.MouseEventHandler<HTMLDivElement> = (e) => {
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
  };

  (function (window) {
    window.addEventListener('resize', () => {
      setTransformWidth(0);
      if (window.innerWidth >= 1024) {
        setListSize(2);
      } else if (window.innerWidth < 1024 && window.innerWidth >= 720) {
        setListSize(4);
      } else {
        setListSize(2);
      }
    });
  })(window);

  return (
    <VideoContainer>
      <DetailVideo
        type={0}
        videoUrl={movie.videos[0].key}
        name={movie.videos[0].name}
      />
      <MiddleRoundedContent>
        <InfoSectionContainer>
          <InfoSectionInner>
            <DetailVideo
              type={1}
              videoUrl={movie.videos[0].key}
              name={movie.videos[0].name}
            />
            <DetailVideo
              type={2}
              videoUrl={movie.videos[0].key}
              name={movie.videos[0].name}
            />
          </InfoSectionInner>
        </InfoSectionContainer>
        <VideoListSection>
          <InfoSectionContainer>
            <InfoSectionInner>
              <HeaderTitle>동영상</HeaderTitle>
            </InfoSectionInner>
          </InfoSectionContainer>
          <VideoListContainer>
            <VideoListExposure>
              <VideoSwiper
                style={{
                  transform: `translateX(-${transformWidth}px)`,
                }}
              >
                <InfoSectionContainer>
                  <InfoSectionInner>
                    <VideoList ref={videoListRef}>
                      {movie.videos.map((video) => (
                        <VideoListItem key={video.id}>
                          <a
                            href={`https://www.youtube.com/watch?v=${video.key}`}
                            target="_blank"
                          >
                            <VideoThumbnailContainer>
                              <VideoThumbnail
                                url={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                              ></VideoThumbnail>
                              <ThumnailBlur>
                                <Icon icon="play" color="#fff" size={20} />
                              </ThumnailBlur>
                            </VideoThumbnailContainer>
                            <VideoTitleContainer>
                              <VideoTitleWrapper>
                                <VideoTitle>{video.name}</VideoTitle>
                              </VideoTitleWrapper>
                            </VideoTitleContainer>
                          </a>
                        </VideoListItem>
                      ))}
                    </VideoList>
                  </InfoSectionInner>
                </InfoSectionContainer>
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
        </VideoListSection>
      </MiddleRoundedContent>
    </VideoContainer>
  );
};

export default DetailContentMiddleSection;
