import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import GridInner from 'components/molecules/GridInner';
import useToggleDispatch from 'hooks/useToggleDispatch';
import Icon from 'Icon/Icon';

const GoLoginContainer = styled.div<{ toggleLogin: boolean }>`
  display: ${(props) => (props.toggleLogin ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  z-index: 150;
  background: rgba(0, 0, 0, 0.56);
  overflow: hidden scroll;
`;

const GoLoginInner = styled.div`
  position: absolute;
  inset: 0;
  z-index: 151;

  @media (min-width: 720px) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px 0px;
    overflow: auto;
  }
`;

const GoLogin = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  @media (min-width: 720px) {
    display: inline-block;
    position: relative;
    text-align: left;
    width: 375px;
    height: auto;
    min-height: 450px;
    border-radius: 6px;
    overflow: auto;
  }
`;

const GoLoginHeader = styled.header`
  width: 100%;
  height: 44px;
  padding: 0px 16px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 50;
`;

const GoLoginHeaderInner = styled.div`
  position: relative;
`;

const ExitButton = styled.button`
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  margin: 10px 0;
  padding: 0;
  cursor: pointer;
  outline: none;
`;

const GoLoginContent = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 44px 0 0;
  overflow: hidden;
  @media (min-width: 720px) {
    box-sizing: content-box;
    height: auto;
    overflow: auto;
  }
`;

const GoLoginContentInner = styled.div`
  display: flex;
  position: absolute;
  inset: 0px;
  flex-direction: column;
  justify-content: flex-end;
`;

const GoLoginNotifi = styled.div`
  display: flex;
  flex: 1 1 0%;
  justify-content: center;
  align-items: center;
`;

const GoLoginNotifiText = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  white-space: pre-line;
  letter-spacing: -0.7px;
`;

const GoLoginButtonContainer = styled.div`
  text-align: center;
  width: 100%;
  margin: 0 0 63px;
`;

const GoLoginButton = styled.button`
  padding: 0px;
  border: none;
  cursor: pointer;
  background-color: #f1c40f;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.7px;
  width: 100%;
  height: 44px;
  border-radius: 6px;
  font-family: 'Nanum Gothic';
  font-weight: 700;
`;

interface IProps {
  toggleLogin: boolean;
  message: string;
}

const ToggleLogin: React.FC<IProps> = ({ toggleLogin, message }) => {
  const history = useHistory();
  const dispatch = useToggleDispatch();

  const handleToggleContainer: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        dispatch({ type: 'TOGGLE_LOGIN' });
      }
    },
    []
  );

  const goRegistrationPage = useCallback(() => {
    dispatch({ type: 'TOGGLE_LOGIN' });
    history.push({
      pathname: '/registration',
      state: { before: location.pathname },
    });
  }, []);

  return (
    <GoLoginContainer toggleLogin={toggleLogin}>
      <GoLoginInner onClick={handleToggleContainer}>
        <GoLogin>
          <GoLoginHeader>
            <GoLoginHeaderInner>
              <ExitButton onClick={() => dispatch({ type: 'TOGGLE_LOGIN' })}>
                <Icon icon="cross" color="#f1c40f" size={16} />
              </ExitButton>
            </GoLoginHeaderInner>
          </GoLoginHeader>
          <GoLoginContent>
            <GoLoginContentInner>
              <GoLoginNotifi>
                <GridInner>
                  <GoLoginNotifiText>{message}</GoLoginNotifiText>
                </GridInner>
              </GoLoginNotifi>
              <GoLoginButtonContainer>
                <GridInner>
                  <GoLoginButton onClick={goRegistrationPage}>
                    회원가입 / 로그인
                  </GoLoginButton>
                </GridInner>
              </GoLoginButtonContainer>
            </GoLoginContentInner>
          </GoLoginContent>
        </GoLogin>
      </GoLoginInner>
    </GoLoginContainer>
  );
};

export default ToggleLogin;
