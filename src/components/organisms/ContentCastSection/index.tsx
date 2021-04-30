import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import GridInner from 'components/molecules/GridInner';
import CastItem from 'components/molecules/CastItem';
import ListArrowBtnBlock from 'components/molecules/ListArrowBtnBlock';
import useListTransform from 'hooks/useListTransform';
import { ICastProps } from 'models/types';

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

const DivideBorder = styled.hr`
  border: 0;
  border-bottom: 1px solid #f0f0f0;
  margin: 20px 0 0;
`;

interface IProps {
  casts: ICastProps[];
}

const ContentCastSection: React.FC<IProps> = ({ casts }) => {
  const {
    state,
    ulElementRef,
    setInitialSize,
    handleSwipe,
  } = useListTransform([3, 6]);
  const { transformWidth, currentListSize } = state;

  useEffect(() => {
    if (window.innerWidth >= 720) {
      setInitialSize(6);
    } else {
      setInitialSize(3);
    }
  }, []);

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
                <Cast ref={ulElementRef}>
                  {casts.map((cast) => (
                    <CastItem key={cast.id} cast={cast} />
                  ))}
                </Cast>
                <DivideBorder />
              </CastInner>
            </InfoSectionContainer>
          </CastSwiper>
        </CastExposure>
        <ListArrowBtnBlock
          transformWidth={transformWidth}
          handleSwipe={handleSwipe}
          contentsLen={casts.length}
          currentListSize={currentListSize}
        />
      </CastContainer>
    </InfoSection>
  );
};

export default ContentCastSection;
