import React from 'react';
import styled from '@emotion/styled';
import Footer from 'components/organisms/Footer';
import RegistrationForm from 'components/organisms/RegistrationForm';

const Main = styled.main`
  margin-top: 3.5rem;
  width: 100%;
  height: 500px;
  background-color: #f4f4f4;
`;

const LoginContainer = styled.section`
  max-width: 1024px;
  margin: 0 auto;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Registration: React.FunctionComponent = () => {
  return (
    <Main>
      <LoginContainer>
        <RegistrationForm />
      </LoginContainer>
      <Footer />
    </Main>
  );
};

export default Registration;
