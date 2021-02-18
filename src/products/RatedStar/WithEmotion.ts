import styled from '@emotion/styled';

const EmptyStars = styled.div<{ isHover?: boolean }>`
  margin: 0px;
  padding: 0px;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  height: auto;
  position: relative;
  ${(props) => props.isHover && `cursor: pointer;`}
`;

const ColorStars = styled.div<{ w: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.w}%`};
  overflow: hidden;
  white-space: nowrap;
`;

const HalfStar = styled.div<{ reverse?: boolean }>`
  display: inline-block;
  overflow: hidden;
  width: 10px;
  ${(props) =>
    props.reverse &&
    `
    direction: rtl;
    `}
`;

export { EmptyStars, ColorStars, HalfStar };
