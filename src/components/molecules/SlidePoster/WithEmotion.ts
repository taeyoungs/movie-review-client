import styled from '@emotion/styled';

const Backdrop = styled.img`
  object-fit: cover;
  display: flex;
  align-items: flex-end;
`;

const GradientContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, black, transparent 40%);
  z-index: 9;
`;

const Info = styled.div`
  position: absolute;
  z-index: 10;
  bottom: -15%;
`;

const Poster = styled.img`
  margin-left: 30px;
  z-index: 10;
  width: 18vw;
  @media (min-width: 1024px) {
    width: 11vw;
    height: calc(11vw * 1.5);
  }
`;

const Content = styled.figcaption`
  position: absolute;
  z-index: 10;
  bottom: -15px;
  left: 30%;
  color: white;
  & p:nth-of-type(1) {
    font-size: 30px;
    margin-bottom: 10px;
  }
  & p:nth-of-type(2) {
    line-height: 20px;
    font-size: 14px;
    color: lightgrey;
    margin-right: 30px;
  }
`;

export { Backdrop, GradientContainer, Info, Poster, Content };
