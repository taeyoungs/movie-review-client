import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';
import { IWorkProps } from 'models/types';
import Icon from 'Icon/Icon';

const WorkLink = styled(Link)`
  width: 100%;
  display: inline-block;
  color: #000;
`;

const WorkPosterPadding = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
  padding-bottom: 145.37%;
`;

const WorkPosterWrapper = styled.div<{ title: string; isPoster: boolean }>`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  background-color: #f0f0f0;
  transition: all 300ms;
  ${(props) =>
    !props.isPoster &&
    `
  &:before {
    content: '${props.title}';
    font-size: 15px;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 20px;
    white-space: pre-wrap;
    overflow: hidden;
    color: #808080;
    padding: 0 10px;
  }
  `}
`;

const Poster = styled.img<{ isLazy: boolean }>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  vertical-align: top;
  opacity: ${(props) => (props.isLazy ? 0 : 1)};
  transition: opacity 300ms;
`;

const WorkInfo = styled.div`
  text-align: left;
  width: calc(100% - 10px);
  margin: 5px 10px 0 0;
`;

const WorkTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${ColorPalette.Main.TEXT_BODY};
  letter-spacing: -0.3px;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WorkVote = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #787878;
  letter-spacing: -0.2px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  height: 18px;
  text-overflow: ellipsis;
  @media (min-width: 720px) {
    margin-top: 2px;
  }
`;

const WorkType = styled.div`
  color: #a0a0a0;
  font-size: 12px;
  letter-spacing: -0.2px;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 1px;
  text-overflow: ellipsis;
`;

interface IProps {
  work: IWorkProps;
  mediaType: string;
  isLazy?: boolean;
}

const WorkItem: React.FC<IProps> = ({ work, mediaType, isLazy = true }) => {
  return (
    <WorkLink to={{ pathname: `/${mediaType}/${work.id}` }}>
      <WorkPosterPadding>
        <WorkPosterWrapper
          title={work.title}
          isPoster={work.poster_path ? true : false}
        >
          {work.poster_path &&
            (isLazy ? (
              <Poster
                isLazy={isLazy}
                alt={work.title}
                className="lazy"
                data-src={`https://image.tmdb.org/t/p/w500${work.poster_path}`}
              />
            ) : (
              <Poster
                isLazy={isLazy}
                alt={work.title}
                src={`https://image.tmdb.org/t/p/w500${work.poster_path}`}
              />
            ))}
        </WorkPosterWrapper>
      </WorkPosterPadding>
      <WorkInfo>
        <WorkTitle>{work.title}</WorkTitle>
        <div>
          <WorkVote>
            <Icon icon="star" color="#f1c40f" size={14} />
            &nbsp;{work.vote_average || 0}
          </WorkVote>
          <WorkType>{mediaType === 'movie' ? '영화' : 'TV 프로그램'}</WorkType>
        </div>
      </WorkInfo>
    </WorkLink>
  );
};

export default React.memo(WorkItem);
