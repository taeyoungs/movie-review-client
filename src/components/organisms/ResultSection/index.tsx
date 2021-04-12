import React from 'react';
import styled from '@emotion/styled';
import P, { TextAlign } from 'components/atoms/P';
import ResultContent from 'components/molecules/ResultContent';
import { ColorPalette } from 'models/color';
import { ISearchProps } from 'models/types';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

interface IProps {
  multiSearch: Array<ISearchProps>;
}

const ResultSection: React.FC<IProps> = ({ multiSearch }) => {
  return (
    <>
      {multiSearch.length > 10
        ? multiSearch
            .slice(0, 9)
            .map((item) => (
              <ResultContent
                key={item.id}
                {...item}
                media_type={item.title ? 'movie' : 'tv'}
              />
            ))
        : multiSearch.map((item) => (
            <ResultContent
              key={item.id}
              {...item}
              media_type={item.title ? 'movie' : 'tv'}
            />
          ))}
      {multiSearch.length === 0 && (
        <LoadingContainer>
          <P align={TextAlign.CENTER} color={ColorPalette.Yellow.YELLOW_600}>
            검색 결과가 존재하지 않습니다.
          </P>
        </LoadingContainer>
      )}
    </>
  );
};

export default ResultSection;
