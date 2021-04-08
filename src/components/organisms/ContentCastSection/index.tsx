import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { ICastProps } from 'models/types';
import { ColorPalette } from 'models/color';
import Icon from 'Icon/Icon';

const InfoSection = styled.section`
  padding: 8px 0 0;
`;

const InfoSectionContainer = styled.div`
  display: block;
`;

const InfoSectionInner = styled.div`
  margin: 0 20px;
`;

const HeaderTitle = styled.h2`
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.7px;
  line-height: 28px;
  margin: 8px 0;
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

const CastItem = styled.li`
  padding-right: 15px;
  width: 100%;
  display: flex;
  height: 76px;
  align-items: center;
  @media (min-width: 720px) {
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
  &:nth-of-type(3n) .info-container {
    border-bottom: none;
  }
`;

const PersonContainer = styled.div`
  position: relative;
`;

const PersonInner = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  overflow: hidden;
  margin: 0 12px 0 0;
  border: none;
`;

const Person = styled.div<{ url?: string }>`
  border-radius: 5px;
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
  width: 100%;
  height: 100%;
`;

const PersonInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  border-bottom: 1px solid #f0f0f0;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PersonInfoInner = styled.div`
  display: flex;
  flex: 1;
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

const Character = styled.div`
  color: #8c8c8c;
  font-size: 13px;
  letter-spacing: -0.3px;
  line-height: 19px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
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
    if (casts) {
      if (window.innerWidth >= 720) {
        setListSize(6);
      } else {
        setListSize(3);
      }
    }
  }, [casts]);

  const handleSwipe: React.MouseEventHandler<HTMLDivElement> = (e) => {
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
  };

  (function (window) {
    window.addEventListener('resize', () => {
      setTransformWidth(0);
      if (window.innerWidth >= 720) {
        setListSize(6);
      } else {
        setListSize(3);
      }
    });
  })(window);
  return (
    <InfoSection>
      <InfoSectionContainer>
        <InfoSectionInner>
          <HeaderTitle>출연/제작</HeaderTitle>
        </InfoSectionInner>
      </InfoSectionContainer>
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
                    <CastItem key={cast.id}>
                      <PersonContainer>
                        <PersonInner>
                          <Person url={cast.profile_path}></Person>
                        </PersonInner>
                      </PersonContainer>
                      <PersonInfoContainer className="info-container">
                        <PersonInfoInner>
                          <Name>{cast.name}</Name>
                          <Character>{cast.character}</Character>
                        </PersonInfoInner>
                      </PersonInfoContainer>
                    </CastItem>
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
