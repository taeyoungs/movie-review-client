import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import GridInner from 'components/molecules/GridInner';
import ToggleLogin from 'components/organisms/ToggleLogin';
import ReviewDetail from 'components/organisms/ReviewDetail';
import Loading from 'products/Loading';
import { GET_REVIEW_QUERY } from 'queries/Query';
import { IReviewProps } from 'models/types';
import Icon from 'Icon/Icon';

const Main = styled.main`
  padding-top: 3.5rem;
  @media (min-width: 720px) {
    padding-bottom: unset;
  }
`;

const Section = styled.section`
  padding: 88px 0 0;
  background-color: #fff;
`;

const SectionHeader = styled.header`
  position: fixed;
  z-index: 9;
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

const ScrollTopTitle = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin: 0 4px 10px;
  opacity: 1;
  transition: 200ms;
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

const ScrollDownTitle = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  text-align: center;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 22px;
  margin: 11px 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  transition: 300ms;
`;

const Content = styled.div`
  padding: 24px 0;
`;

const DetailContainer = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

const Review: React.FunctionComponent = () => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const { loading, data } = useQuery<{ getReview: IReviewProps }>(
    GET_REVIEW_QUERY,
    {
      variables: {
        reviewId: location.pathname.split('/')[2],
      },
    }
  );

  useEffect(() => {
    document.body.style.backgroundColor = '#fff';
  }, []);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleToggleLogin = () => {
    setToggleLogin((prevState) => !prevState);
    if (!toggleLogin) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  };
  return (
    <Main>
      {loading ? (
        <Loading />
      ) : (
        data && (
          <Section>
            <SectionHeader>
              <GoBack>
                <IconWrapper onClick={handleGoBack}>
                  <Icon icon="arrowRight" color="#f1c40f" size={18} />
                </IconWrapper>
                <IconWrapper></IconWrapper>
              </GoBack>
              <ScrollTopTitle>
                <TopTitle>리뷰</TopTitle>
              </ScrollTopTitle>
              <ScrollDownTitle></ScrollDownTitle>
            </SectionHeader>
            <Content>
              <GridInner>
                <DetailContainer>
                  <ReviewDetail
                    review={data.getReview}
                    handleToggleLogin={handleToggleLogin}
                  />
                </DetailContainer>
              </GridInner>
            </Content>
          </Section>
        )
      )}
      <ToggleLogin
        toggleLogin={toggleLogin}
        handleToggleLogin={handleToggleLogin}
        message="로그인이 필요한 기능입니다. 로그인 또는 회원가입을 진행해주세요."
      />
    </Main>
  );
};

export default Review;
