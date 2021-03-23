import React from 'react';
import styled from '@emotion/styled';
import Input, { InputAppearance } from 'products/Input';
import Icon from 'Icon/Icon';
import { ColorPalette } from 'models/color';

const Main = styled.main`
  margin-top: 3.5rem;
  width: 100%;
  height: 500px;
  background-color: #f4f4f4;
`;

const LoginContainer = styled.section`
  min-width: 1024px;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const FormContainer = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  display: block;
  border: 0;
  cursor: pointer;
  width: 100%;
  padding: 10px 0;
  background-color: ${ColorPalette.Main.CTA_PRIMARY};
  font-weight: 600;
  margin-bottom: 30px;
`;

const SocialLoginContainer = styled.div`
  display: flex;
`;

const Notification = styled.h2`
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  padding: 30px 0px 20px;
  text-align: center;
`;

const SocialLoginButton = styled.button`
  border: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 40px;
  cursor: pointer;
  color: #fff;
  &:nth-of-type(1) {
    margin-right: 10px;
    background-color: #c23321;
  }
  &:nth-of-type(2) {
    background-color: #211f1f;
  }
`;

const Registration: React.FunctionComponent = () => {
  return (
    <Main>
      <LoginContainer>
        <Title>로그인</Title>
        <FormContainer>
          <Input
            id="user-id"
            label="아이디"
            placeholder="아이디를 입력해주세요."
            appearance={InputAppearance.PRIMARY}
          />
          <Input
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            appearance={InputAppearance.PRIMARY}
          />
          <SubmitButton>로그인</SubmitButton>
          <Notification>다른 서비스로 로그인</Notification>
          <SocialLoginContainer>
            <SocialLoginButton>
              <Icon icon="google" color="#fff" size={20} /> Google 로그인
            </SocialLoginButton>
            <SocialLoginButton>
              <Icon icon="github" color="#fff" size={20} />
              Github 로그인
            </SocialLoginButton>
          </SocialLoginContainer>
        </FormContainer>
      </LoginContainer>
    </Main>
  );
};

export default Registration;
