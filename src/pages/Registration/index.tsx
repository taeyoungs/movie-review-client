import React, { useState } from 'react';
import styled from '@emotion/styled';
import Input, { InputAppearance, InputType } from 'components/atoms/Input';
import { ColorPalette } from 'models/color';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import useSocialAuth from 'hooks/useSocialAuth';
import { useLocation } from 'react-router';

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
  margin-top: 30px;
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
  & .google-login-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const Notification = styled.h2`
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  padding: 30px 0px 20px;
  text-align: center;
  font-size: 14px;
`;

const Registration: React.FunctionComponent = () => {
  const location: { state: { before: string } } = useLocation();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');

  const { onSocialAuth } = useSocialAuth({ path: location.state.before });

  function isGoogleLoginResponse(
    type: GoogleLoginResponse | GoogleLoginResponseOffline
  ): type is GoogleLoginResponse {
    return type.hasOwnProperty('tokenId');
  }

  const handleLogin = async (
    googleData: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const token = isGoogleLoginResponse(googleData)
      ? googleData.tokenId
      : googleData.code;
    onSocialAuth(token);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };

  const handleError1 = () => {
    if (id === '') {
      setError1('아이디를 입력해주세요.');
    } else {
      setError1('');
    }
  };

  const handleError2 = () => {
    if (pw === '') {
      setError2('비밀번호를 입력해주세요.');
    } else {
      setError2('');
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    handleError1();
    handleError2();

    if (error1 || error2) return false;
    else return true;
  };

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
            value={id}
            onChange={handleIdChange}
            error={error1}
            onBlur={handleError1}
          />
          <Input
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            appearance={InputAppearance.PRIMARY}
            value={pw}
            onChange={handlePwChange}
            type={InputType.PASSWORD}
            error={error2}
            onBlur={handleError2}
          />
          <SubmitButton onClick={handleSubmit}>로그인</SubmitButton>
          <Notification>다른 서비스로 로그인</Notification>
          <SocialLoginContainer>
            <GoogleLogin
              clientId="252963294721-qn6685fjcoee6ie2a4kc54rmufignsoq.apps.googleusercontent.com"
              buttonText="Google 로그인"
              className="google-login-button"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={'single_host_origin'}
            />
          </SocialLoginContainer>
        </FormContainer>
      </LoginContainer>
    </Main>
  );
};

export default Registration;
