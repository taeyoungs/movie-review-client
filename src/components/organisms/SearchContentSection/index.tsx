import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import GridInner from 'components/molecules/GridInner';
import ListArrowBtnBlock from 'components/molecules/ListArrowBtnBlock';
import SearchContentList from 'components/molecules/SearchContentList';
import useListTransform from 'hooks/useListTransform';
import { ISearchProps } from 'models/types';

const Section = styled.section`
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
    font-weight: 700;
    color: #f1c40f;
  }
`;

const Container = styled.div`
  position: relative;
  &:hover .arrow-button {
    opacity: 1;
  }
`;

const Exposure = styled.div`
  overflow: hidden;
`;

const Swiper = styled.div`
  transition: 500ms;
`;

const DivideBorder = styled.hr`
  border: 0;
  border-bottom: 1px solid #f0f0f0;
  margin: 0 20px;
`;

interface IProps {
  items: ISearchProps[];
  headerTitle: string;
  query: string;
}

function SearchContentSection({
  items,
  headerTitle,
  query,
}: IProps): JSX.Element {
  const {
    state,
    ulElementRef,
    setInitialSize,
    handleSwipe,
  } = useListTransform([3, 6, 9]);
  const { transformWidth, currentListSize } = state;

  const handleInitialSize = () => {
    if (window.innerWidth >= 1024) {
      setInitialSize(9);
    } else if (window.innerWidth < 1024 && window.innerWidth >= 720) {
      setInitialSize(6);
    } else {
      setInitialSize(3);
    }
  };

  useEffect(() => {
    handleInitialSize();
    window.addEventListener('resize', handleInitialSize);
    return () => {
      window.removeEventListener('resize', handleInitialSize);
    };
  }, []);

  return (
    <Section>
      <GridInner>
        <ContentHeader>
          <HeaderTitle>{headerTitle}</HeaderTitle>
          <HeaderMoreButton>
            <MoreButton>
              <Link to={`/search/${items[0].media_type}?query=${query}`}>
                더보기
              </Link>
            </MoreButton>
          </HeaderMoreButton>
        </ContentHeader>
      </GridInner>
      <Container>
        <Exposure>
          <Swiper
            style={{
              transform: `translateX(-${transformWidth}px)`,
            }}
          >
            <GridInner>
              <SearchContentList items={items} ulElementRef={ulElementRef} />
            </GridInner>
          </Swiper>
        </Exposure>
        <ListArrowBtnBlock
          transformWidth={transformWidth}
          handleSwipe={handleSwipe}
          contentsLen={items.length}
          currentListSize={currentListSize}
        />
      </Container>
      <DivideBorder />
    </Section>
  );
}

export default SearchContentSection;
