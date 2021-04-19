import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import PersonSection from 'components/organisms/PersonSection';
import Footer from 'components/organisms/Footer';
import Loading from 'products/Loading';
import { GET_PERSON_CREDITS_QUERY, GET_PERSON_QUERY } from 'queries/Query';
import { IPersonProps, IWorkProps } from 'models/types';

const Main = styled.main`
  padding-top: 3.5rem;
  padding-bottom: 56px;
  @media (min-width: 720px) {
    padding-bottom: unset;
  }
`;

const Person: React.FunctionComponent = () => {
  const location = useLocation();

  const { loading: personLoading, data: personData } = useQuery<{
    getPerson: IPersonProps;
  }>(GET_PERSON_QUERY, {
    variables: {
      personId: location.pathname.split('/')[2],
    },
  });

  const { loading: creditLoading, data: creditData } = useQuery<{
    getPersonCredits: { credits: IWorkProps[]; totalCount: number };
  }>(GET_PERSON_CREDITS_QUERY, {
    variables: {
      personId: location.pathname.split('/')[2],
      page: 1,
    },
  });

  return (
    <Main>
      {personLoading && creditLoading ? (
        <Loading />
      ) : (
        personData &&
        creditData && (
          <>
            <PersonSection
              person={personData.getPerson}
              credits={creditData.getPersonCredits.credits}
              totalCount={creditData.getPersonCredits.totalCount}
            />
            <Footer />
          </>
        )
      )}
    </Main>
  );
};

export default Person;
