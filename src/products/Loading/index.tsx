import React from 'react';
import styled from '@emotion/styled';
import Icon from 'Icon/Icon';

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #1f1f1f;
`;

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loading: React.FunctionComponent = () => {
  return (
    <LoadingContainer>
      <Spinner>
        <Icon icon="spinner" />
      </Spinner>
    </LoadingContainer>
  );
};

export default Loading;
