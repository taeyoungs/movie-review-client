import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useLazyQuery, useQuery } from '@apollo/client';
import Loading from 'products/Loading';
import WorkContainer from 'components/organisms/WorkContainer';
import useCategoryState from 'hooks/useCategoryState';
import useCategoryDispatch from 'hooks/useCategoryDispatch';
import { GET_WORKS_QUERY } from 'queries/Query';
import { IWorksProps } from 'models/types';

const Section = styled.section`
  width: 100%;
  min-height: calc(100vh - 3.5rem);
  padding-bottom: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 3.5%;
`;

const ContainerInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 0;
`;

const Category = styled.div`
  width: 100%;
  & h1 {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 720px) {
    flex-direction: row;
    justify-content: center;
  }
`;

interface IProps {
  mediaType: string;
  children: React.ReactNode;
  movieCategory: {
    [key: string]: string;
  };
  showCategory: {
    [key: string]: string;
  };
}

function WorkSection({
  mediaType,
  children,
  movieCategory,
  showCategory,
}: IProps): JSX.Element {
  const state = useCategoryState();
  const dispatch = useCategoryDispatch();
  const pageRef = useRef(2);

  const { category } = state;

  const { loading, data, refetch } = useQuery<{
    getWorks: IWorksProps;
  }>(GET_WORKS_QUERY, {
    variables: {
      page: 1,
      mediaType,
      contentType: state.category,
    },
  });

  useEffect(() => {
    pageRef.current = 2;
    dispatch({ type: 'SET_CATEGORY', content: 'popular' });
    // console.log('Changed mediaType');
  }, [mediaType]);
  useEffect(() => {
    pageRef.current = 2;
    refetch();
    // console.log('Changed category');
  }, [state.category]);

  return (
    <Section>
      <Container>
        <ContainerInner>
          <Category>
            <h1>
              {mediaType === 'movie'
                ? movieCategory[category]
                : showCategory[category]}
            </h1>
          </Category>
          <Content>
            {children}
            {loading ? (
              <Loading />
            ) : (
              data && (
                <WorkContainer
                  works={data.getWorks.works}
                  totalPage={data.getWorks.totalPage}
                  pageRef={pageRef}
                />
              )
            )}
          </Content>
        </ContainerInner>
      </Container>
    </Section>
  );
}

export default WorkSection;
