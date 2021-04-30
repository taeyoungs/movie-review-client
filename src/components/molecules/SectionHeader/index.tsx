import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import Icon from 'Icon/Icon';

const Header = styled.header`
  position: fixed;
  z-index: 5;
  background-color: #fff;
  top: 3.5rem;
  left: 0;
  width: 100%;
  height: auto;
  text-align: left;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 16px;
`;

const GoBack = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  & svg {
    transform: rotate(-180deg);
    margin: 10px 0;
  }
  &:nth-of-type(1) {
    cursor: pointer;
  }
`;

const ScrollTopTitle = styled.div<{ toggleHeader: boolean }>`
  display: flex;
  align-items: center;
  margin: ${(props) => (props.toggleHeader ? '0 4px' : '0 4px 10px')};
  height: ${(props) => (props.toggleHeader ? '0' : '30px')};
  opacity: ${(props) => (props.toggleHeader ? 0 : 1)};
  transition: 200ms;
  ${(props) =>
    props.toggleHeader &&
    `
    & > div {
        display: none;
    }
  `}
`;

const TopTitle = styled.div`
  display: inline-block;
  font-weight: 700;
  letter-spacing: -1.2px;
  font-size: 20px;
  line-height: 29px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ScrollDownTitle = styled.div<{ toggleHeader: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  text-align: center;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 27px;
  margin: 11px 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: ${(props) => (props.toggleHeader ? 1 : 0)};
  transition: 300ms;
`;

interface IProps {
  title: string;
}

function SectionHeader({ title }: IProps): JSX.Element {
  const history = useHistory();
  const handleGoBack = useCallback(() => history.goBack(), []);
  const [toggleHeader, setToggleHeader] = useState(false);

  const handleHeaderScroll = useCallback(() => {
    if (document.documentElement.scrollTop >= 395) {
      setToggleHeader(true);
    } else {
      setToggleHeader(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleHeaderScroll);
    return () => {
      window.removeEventListener('scroll', handleHeaderScroll);
    };
  }, []);

  return (
    <Header>
      <GoBack>
        <IconWrapper onClick={handleGoBack}>
          <Icon icon="arrowRight" color="#f1c40f" size={18} />
        </IconWrapper>
        <IconWrapper></IconWrapper>
      </GoBack>
      <ScrollTopTitle toggleHeader={toggleHeader}>
        <TopTitle>{title}</TopTitle>
      </ScrollTopTitle>
      <ScrollDownTitle toggleHeader={toggleHeader}>{title}</ScrollDownTitle>
    </Header>
  );
}

export default SectionHeader;
