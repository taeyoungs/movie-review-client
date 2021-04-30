import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ISearchProps } from 'models/types';
import { ColorPalette } from 'models/color';

const List = styled.ul<{ itemsLen: number }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: 0 -5px 0;
  ${(props) =>
    props.itemsLen === 1 &&
    `
    height: 76px;
    & .info-container {
        border-bottom: none;
    }
    `}
  ${(props) =>
    props.itemsLen === 2 &&
    `
    height: 152px;
    & li:last-child .info-container {
        border-bottom: none;
    }
    `}
  ${(props) => props.itemsLen >= 3 && 'height: 228px;'}
  &::after {
    content: "";
    display: inline-block;
    width: 20px;
    height: 100%;
  }
`;

const ListItem = styled.li`
  width: 100%;
  padding: 0 5px;
  @media (min-width: 640px) {
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: calc(100% / 3);
  }
  @media (min-width: 1360px) {
    width: 25%;
  }
  &:nth-of-type(3n) .info-container {
    border-bottom: none;
  }
`;

const ELink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 76px;
`;

const PosterContainer = styled.div`
  position: relative;
`;

const PosterInner = styled.div`
  position: relative;
  width: 56px;
  height: 56px;
  overflow: hidden;
  background-color: #e5e5e5;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.8);
  margin: 0 12px 0 0;
  border: none;
`;

const Poster = styled.div<{ url?: string }>`
  display: inline-block;
  position: absolute;
  inset: 0;
  ${(props) =>
    props.url
      ? `
    background-image: url(https://image.tmdb.org/t/p/w500${props.url});
  `
      : `
    background-color: #e5e5e5;
  `}
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const PosterInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 0%;
  border-bottom: 1px solid #f0f0f0;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PosterInfoInner = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Name = styled.div`
  color: ${ColorPalette.Main.TEXT_BODY};
  font-size: 17px;
  letter-spacing: -0.7px;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  color: #8c8c8c;
  font-size: 13px;
  letter-spacing: -0.3px;
  line-height: 19px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
  display: flex;
  align-items: center;
`;

interface IProps {
  items: ISearchProps[];
  ulElementRef: React.RefObject<HTMLUListElement>;
}

function SearchContentList({ items, ulElementRef }: IProps): JSX.Element {
  return (
    <List ref={ulElementRef} itemsLen={items.length}>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ELink to={`/${item.media_type}/${item.id}`}>
            <PosterContainer>
              <PosterInner>
                <Poster url={item.poster_path}></Poster>
              </PosterInner>
            </PosterContainer>
            <PosterInfoContainer className="info-container">
              <PosterInfoInner>
                <Name>{item.title}</Name>
                {item.release_date && (
                  <Date>{item.release_date.slice(0, 4)}</Date>
                )}
              </PosterInfoInner>
            </PosterInfoContainer>
          </ELink>
        </ListItem>
      ))}
    </List>
  );
}

export default React.memo(SearchContentList);
