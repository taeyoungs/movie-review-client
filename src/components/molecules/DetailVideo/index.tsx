import React from 'react';
import styled from '@emotion/styled';

const DetailVideoSection = styled.section<{ type: number }>`
  display: flex;
  justify-content: center;
  
  ${(props) =>
    props.type === 0 &&
    `
  margin: 0 0 12px;
  @media (max-width: 1024px) {
      display: none;
  }
  `}
  ${(props) =>
    props.type === 1 &&
    `
  margin: 26px 0 15px;
  @media (max-width: 720px) {
      display: none;
  }
  @media (min-width: 1024px) {
      display: none
  }
  `}
  ${(props) =>
    props.type === 2 &&
    `
  padding: 20px 0 10px;
  margin: 0 -20px; 
  @media (min-width: 720px) {
      display: none;
  }
  `}
`;

const ReuseVideoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  overflow: hidden;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  @media (min-width: 720px) {
    width: 420px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
  }
  @media (min-width: 1024px) {
    width: 100%;
  }
`;

const Video = styled.div`
  height: 0;
  padding-top: 56.25%;
  background-color: #e5e5e5;
  position: relative;
`;

const YoutubIFrame = styled.iframe`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const VideoTitle = styled.h2`
  margin: 0 12px;
  padding: 14px 0;
  line-height: 22px;
  letter-spacing: -0.7px;
`;

const VideoSection = styled.section`
  width: 100%;
  overflow: hidden;
`;

interface IProps {
  videoUrl: string | null;
  name: string | null;
  type: number;
}

const DetailVideo: React.FC<IProps> = ({ videoUrl, name, type = 0 }) => {
  return (
    <DetailVideoSection type={type}>
      <ReuseVideoBlock>
        <VideoSection>
          <Video>
            {videoUrl && (
              <YoutubIFrame
                width="900"
                height="506"
                src={`https://www.youtube.com/embed/${videoUrl}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></YoutubIFrame>
            )}
          </Video>
          <VideoTitle>{name ? name : '준비 중입니다.'}</VideoTitle>
        </VideoSection>
      </ReuseVideoBlock>
    </DetailVideoSection>
  );
};

export default DetailVideo;
