import React from 'react';
import styled from '@emotion/styled';
import GridInner from 'components/molecules/GridInner';
import { Link } from 'react-router-dom';

const Main = styled.main`
  margin-top: 3.5rem;
  width: 100%;
  background-color: #fff;
`;

const Section = styled.section`
  padding: 0 0 32px;
`;

const SearchContentSection = styled.section`
  padding: 8px 0;
`;

const ContentHeader = styled.header`
  overflow: hidden;
`;

const HeaderTitle = styled.h2`
  float: left;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.7px;
  line-height: 28px;
  margin: 8px 0;
`;

const HeaderMoreButton = styled.div`
  float: right;
`;

const MoreButton = styled.div`
  margin: 12px 0;
  & a {
    color: #f1c40f;
  }
`;

// ToDo: query 3개 - 영화, TV 프로그램, 사람
// Section 3개인데 동일한 디자인 props만 다르게
// 더보기 페이지도 동일
function Search(): JSX.Element {
  return (
    <Main>
      <Section>
        <SearchContentSection>
          <GridInner>
            <ContentHeader>
              <HeaderTitle>영화</HeaderTitle>
              <HeaderMoreButton>
                <MoreButton>
                  <Link to="#">더보기</Link>
                </MoreButton>
              </HeaderMoreButton>
            </ContentHeader>
          </GridInner>
        </SearchContentSection>
      </Section>
    </Main>
  );
}

export default Search;
