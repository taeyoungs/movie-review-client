import React from 'react';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #1f1f1f;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Footer: React.FunctionComponent = () => {
  return <FooterContainer>Footer</FooterContainer>;
};

export default Footer;
