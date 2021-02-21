import styled from '@emotion/styled';

const ItemContainer = styled.li`
  width: 100%;
  display: flex;
  padding: 5px;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  box-sizing: border-box;
`;

const PosterContainer = styled.div`
  width: 4rem;
  min-width: 4rem;
  height: calc(4rem * 1.5);
`;

const Poster = styled.div<{ imgPath?: string }>`
  background: url(${(props) => props.imgPath});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NoImgContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export {
  ItemContainer,
  PosterContainer,
  Poster,
  ContentContainer,
  RatingContainer,
  NoImgContainer,
};
