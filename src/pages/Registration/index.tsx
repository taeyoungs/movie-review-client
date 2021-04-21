import React, { useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Input, { InputAppearance, InputType } from 'components/atoms/Input';
import Footer from 'components/organisms/Footer';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import useSocialAuth from 'hooks/useSocialAuth';
import useLocalSignIn from 'hooks/useLocalSignIn';
import useLocalSignUp from 'hooks/useLocalSignUp';
import useInputs from 'hooks/useInputs';
import { ColorPalette } from 'models/color';

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

const FormTypeContainer = styled.div`
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  width: 100%;
  margin-bottom: 30px;
  & h2:nth-of-type(1) {
    border-right: 1px solid #e5e5e5;
  }
`;

const SignType = styled.h2<{ selected: boolean }>`
  width: 50%;
  text-align: center;
  font-size: 22px;
  padding: 15px 0;
  cursor: pointer;
  color: ${(props) =>
    props.selected ? '#000' : ColorPalette.Neutral.NEUTRAL_400};
  &:hover {
    color: ${ColorPalette.Main.CTA_PRIMARY};
  }
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

const ErrorMsg = styled.div`
  color: #db3e3e;
  font-size: 14px;
  margin-bottom: 10px;
`;

interface IErrorProps {
  idError: string;
  pwError: string;
  gqlError: string;
}

type Action = 'SET_ID_ERROR' | 'SET_PW_ERROR' | 'SET_GQL_ERROR' | 'CLEAR_ALL';
interface IActionProps {
  type: Action;
  content: string;
}

const errorReducer = (state: IErrorProps, action: IActionProps) => {
  switch (action.type) {
    case 'SET_ID_ERROR':
      return {
        ...state,
        idError: action.content,
      };
    case 'SET_PW_ERROR':
      return {
        ...state,
        pwError: action.content,
      };
    case 'SET_GQL_ERROR':
      return {
        ...state,
        gqlError: action.content,
      };
    case 'CLEAR_ALL':
      return {
        idError: '',
        pwError: '',
        gqlError: '',
      };
    default:
      throw new Error('Unhandled action');
  }
};

const Registration: React.FunctionComponent = () => {
  const location: { state: { before: string } } = useLocation();
  const [error, dispatch] = useReducer(errorReducer, {
    idError: '',
    pwError: '',
    gqlError: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const { onSocialAuth } = useSocialAuth({ path: location.state.before });
  const { onLocalSignIn } = useLocalSignIn({ path: location.state.before });
  const { onLocalSignUp } = useLocalSignUp({ path: location.state.before });

  const { form, onChange, reset } = useInputs({
    id: '',
    pw: '',
  });

  const { id, pw } = form;

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

  const handleIdError = () => {
    if (id === '') {
      dispatch({ type: 'SET_ID_ERROR', content: '아이디를 입력해주세요.' });
    } else {
      dispatch({ type: 'SET_ID_ERROR', content: '' });
    }
  };

  const handlePwError = () => {
    if (pw === '') {
      dispatch({ type: 'SET_PW_ERROR', content: '비밀번호를 입력해주세요.' });
    } else {
      dispatch({ type: 'SET_PW_ERROR', content: '' });
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    handleIdError();
    handlePwError();

    if (id !== '' && pw !== '') {
      const error = await onLocalSignIn(id, pw);
      dispatch({ type: 'SET_GQL_ERROR', content: error });
    }
  };

  const handleSignUp: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    handleIdError();
    handlePwError();

    if (id !== '' && pw !== '') {
      const error = await onLocalSignUp(id, pw);
      dispatch({ type: 'SET_GQL_ERROR', content: error });
    }
  };

  return (
    <Main>
      <LoginContainer>
        <FormContainer>
          <FormTypeContainer>
            <SignType
              selected={isSignUp}
              onClick={() => {
                setIsSignUp(true);
                dispatch({ type: 'CLEAR_ALL', content: '' });
                reset();
              }}
            >
              회원가입
            </SignType>
            <SignType
              selected={!isSignUp}
              onClick={() => {
                setIsSignUp(false);
                dispatch({ type: 'CLEAR_ALL', content: '' });
                reset();
              }}
            >
              로그인
            </SignType>
          </FormTypeContainer>
          {error.gqlError && <ErrorMsg>❗ {error.gqlError}</ErrorMsg>}
          <Input
            id="user-id"
            label="아이디"
            placeholder="아이디를 입력해주세요."
            appearance={InputAppearance.PRIMARY}
            value={id}
            onChange={onChange}
            error={error.idError}
            onBlur={handleIdError}
            name="id"
          />
          <Input
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            appearance={InputAppearance.PRIMARY}
            value={pw}
            onChange={onChange}
            type={InputType.PASSWORD}
            error={error.pwError}
            onBlur={handlePwError}
            name="pw"
          />
          {isSignUp ? (
            <SubmitButton onClick={handleSignUp}>회원가입</SubmitButton>
          ) : (
            <SubmitButton onClick={handleSubmit}>로그인</SubmitButton>
          )}
          <Notification>다른 서비스로 로그인</Notification>
          <SocialLoginContainer>
            <GoogleLogin
              clientId="252963294721-qn6685fjcoee6ie2a4kc54rmufignsoq.apps.googleusercontent.com"
              buttonText="Google 로그인"
              className="google-login-button"
              onSuccess={handleLogin}
              onFailure={() => null}
              cookiePolicy={'single_host_origin'}
            />
          </SocialLoginContainer>
        </FormContainer>
      </LoginContainer>
      <Footer />
    </Main>
  );
};

export default Registration;
