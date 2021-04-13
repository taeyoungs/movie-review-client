import styled from '@emotion/styled';

const SlideContainer = styled.div`
  grid-column: span 1;
  display: none;
  padding: 10px 5px 0;
  @media (min-width: 1024px) {
    display: block;
  }
`;

const UpNextItem = styled.figure`
  display: flex;
  padding: 0 16px;
  width: 100%;
  flex: 0 0 148px;
  overflow: hidden;
  position: relative;
  & figcaption p:nth-of-type(1) {
    color: white;
    margin-bottom: 10px;
    font-size: 16px;
  }
  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    flex: 0 0 113px;
  }
`;

const UpNext = styled.div`
  position: relative;
  height: 444px;
  overflow: hidden;
  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    height: 339px;
  }
`;

const UpNextPoster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
`;

export { SlideContainer, UpNextItem, UpNext, UpNextPoster };
