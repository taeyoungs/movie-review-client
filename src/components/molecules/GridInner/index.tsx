import React from 'react';
import styled from '@emotion/styled';

const Section = styled.section`
  padding: 8px 0 0;
`;

const Container = styled.div`
  display: block;
`;

const Inner = styled.div`
  margin: 0 20px;
`;

const HeaderTitle = styled.h2`
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.7px;
  line-height: 28px;
  margin: 8px 0;
`;

interface IProps {
  section?: boolean;
  title?: boolean;
}

const GridInner: React.FC<IProps> = ({
  children,
  section = false,
  title = false,
}) => {
  return section ? (
    <Section>
      <Container>
        <Inner>{children}</Inner>
      </Container>
    </Section>
  ) : title ? (
    <Section>
      <Container>
        <Inner>
          <HeaderTitle>{children}</HeaderTitle>
        </Inner>
      </Container>
    </Section>
  ) : (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};

export default GridInner;
