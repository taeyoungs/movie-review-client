import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: block;
`;

const Inner = styled.div`
  margin: 0 20px;
`;

const GridInner: React.FunctionComponent = ({ children }) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};

export default GridInner;
