import React from 'react';
import styled from '@emotion/styled';
import { IVideo } from 'models/types';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';

const VideoListItem = styled.li`
  display: inline-block;
  padding: 0 5px;
  vertical-align: top;
  width: 50%;
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
  &.lazy {
    background-image: none;
    background-color: #e5e5e5;
  }
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
  font-size: 14px;
  letter-spacing: -0.4px;
  line-height: 20px;
  color: ${ColorPalette.Main.TEXT_BODY};
  @media (min-width: 720px) {
    font-size: 12px;
  }
`;

const VideoTitleMargin = styled.div`
  margin: 8px 0 0;
`;

const VideoTitleWrapper = styled.div`
  word-break: break-all;
  overflow: hidden;
  max-height: 50px;
  margin: 0;
`;

const VideoTitle = styled.div`
  white-space: pre-wrap;
  line-height: 18px;
`;

interface IProps {
  video: IVideo;
}

function VideoItem({ video }: IProps): JSX.Element {
  return (
    <VideoListItem>
      <a href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank">
        <VideoThumbnailContainer>
          <VideoThumbnail
            url={`https://img.youtube.com/vi/${video.key}/0.jpg`}
            className="lazy"
          ></VideoThumbnail>
          <ThumnailBlur>
            <Icon icon="play" color="#fff" size={20} />
          </ThumnailBlur>
        </VideoThumbnailContainer>
        <VideoTitleContainer>
          <VideoTitleMargin>
            <VideoTitleWrapper>
              <VideoTitle>{video.name}</VideoTitle>
            </VideoTitleWrapper>
          </VideoTitleMargin>
        </VideoTitleContainer>
      </a>
    </VideoListItem>
  );
}

export default React.memo(VideoItem);
