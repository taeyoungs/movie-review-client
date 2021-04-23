import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import GridInner from 'components/molecules/GridInner';
import { ICastProps } from 'models/types';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';
import CastItem from 'components/molecules/CastItem';

const InfoSection = styled.section`
  padding: 8px 0 0;
`;

const InfoSectionContainer = styled.div`
  display: block;
`;

const CastContainer = styled.div`
  position: relative;
  &:hover .arrow-button {
    opacity: 1;
  }
`;

const CastExposure = styled.div`
  overflow: hidden;
`;

const CastSwiper = styled.div`
  transition: 500ms;
`;

const CastInner = styled.div`
  margin: 0 15px 0 25px;
`;

const Cast = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: flex-start;
  height: 228px;
  margin: 4px -5px 16px;
`;

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

const DivideBorder = styled.hr`
  border: 0;
  border-bottom: 1px solid #f0f0f0;
  margin: 20px 0 0;
`;

interface IProps {
  casts: ICastProps[];
}

const ContentCastSection: React.FC<IProps> = ({ casts }) => {
  const [transformWidth, setTransformWidth] = useState(0);
  const [listSize, setListSize] = useState(0);
  const castListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.innerWidth >= 720) {
      setListSize(6);
    } else {
      setListSize(3);
    }

    // window.addEventListener('resize', () => {
    //   setTransformWidth(0);
    //   if (window.innerWidth >= 720) {
    //     setListSize(6);
    //   } else {
    //     setListSize(3);
    //   }
    // });
  }, []);

  const handleSwipe: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      let width = 0;
      if (castListRef.current) {
        width = castListRef.current.clientWidth;
      }
      if (e.currentTarget.parentElement) {
        const dir = e.currentTarget.parentElement.getAttribute('dir');
        if (dir === 'left') {
          setTransformWidth((prevState) => prevState - width);
          if (window.innerWidth >= 720) {
            setListSize((prevState) => prevState - 6);
          } else {
            setListSize((prevState) => prevState - 3);
          }
        }
        if (dir === 'right') {
          setTransformWidth((prevState) => prevState + width);
          if (window.innerWidth >= 720) {
            setListSize((prevState) => prevState + 6);
          } else {
            setListSize((prevState) => prevState + 3);
          }
        }
      }
    },
    []
  );

  return (
    <InfoSection>
      <GridInner title>출연/제작</GridInner>
      <CastContainer>
        <CastExposure>
          <CastSwiper
            style={{
              transform: `translateX(-${transformWidth}px)`,
            }}
          >
            <InfoSectionContainer>
              <CastInner>
                <Cast ref={castListRef}>
                  {casts.map((cast) => (
                    <CastItem key={cast.id} cast={cast} />
                  ))}
                </Cast>
                <DivideBorder />
              </CastInner>
            </InfoSectionContainer>
          </CastSwiper>
        </CastExposure>
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
          displayNone={casts.length <= listSize}
        >
          <ArrowButton onClick={handleSwipe}>
            <Icon icon="arrowRight" size={16} />
          </ArrowButton>
        </ArrowButtonBlock>
      </CastContainer>
    </InfoSection>
  );
};

export default ContentCastSection;
