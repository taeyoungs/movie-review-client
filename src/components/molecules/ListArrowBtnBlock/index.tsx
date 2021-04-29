import React from 'react';
import styled from '@emotion/styled';
import Icon from 'Icon/Icon';

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
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  handleSwipe: React.MouseEventHandler<HTMLDivElement>;
  transformWidth: number;
  contentsLen: number;
  currentListSize: number;
}

function ListArrowBtnBlock({
  handleSwipe,
  transformWidth,
  contentsLen,
  currentListSize,
}: IProps): JSX.Element {
  return (
    <>
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
        displayNone={contentsLen <= currentListSize}
      >
        <ArrowButton onClick={handleSwipe}>
          <Icon icon="arrowRight" size={16} />
        </ArrowButton>
      </ArrowButtonBlock>
    </>
  );
}

export default ListArrowBtnBlock;
