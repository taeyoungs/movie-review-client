import styled from '@emotion/styled';

const SlideContainer = styled.div`
  grid-column: span 1;
  display: none;
  padding: 10px 5px 0;
  @media (min-width: 1024px) {
    display: block;
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

export { SlideContainer, UpNext };
