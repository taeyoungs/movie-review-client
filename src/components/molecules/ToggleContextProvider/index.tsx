import React, { createContext, Dispatch, useReducer } from 'react';
import ToggleLogin from 'components/organisms/ToggleLogin';

interface IToggleStateProps {
  toggleLogin: boolean;
  toggleReview: boolean;
  toggleNotifi: boolean;
}

type Action =
  | { type: 'TOGGLE_LOGIN' }
  | { type: 'TOGGLE_REVIEW' }
  | { type: 'TOGGLE_NOTIFI' };

type ToggleDispatch = Dispatch<Action>;

const toggleReducer = (state: IToggleStateProps, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIN':
      if (!state.toggleLogin) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }
      return {
        ...state,
        toggleLogin: !state.toggleLogin,
      };
    case 'TOGGLE_REVIEW':
      if (!state.toggleReview) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }
      return {
        ...state,
        toggleReview: !state.toggleReview,
      };
    case 'TOGGLE_NOTIFI':
      if (!state.toggleNotifi) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }
      return {
        ...state,
        toggleNotifi: !state.toggleNotifi,
      };
    default:
      return state;
  }
};

export const ToggleStateContext = createContext<IToggleStateProps | null>(null);
export const ToggleDispatchContext = createContext<ToggleDispatch | null>(null);

const ToggleContextProvider: React.FunctionComponent = ({ children }) => {
  const [toggle, dispatch] = useReducer(toggleReducer, {
    toggleLogin: false,
    toggleReview: false,
    toggleNotifi: false,
  });

  return (
    <ToggleStateContext.Provider value={toggle}>
      <ToggleDispatchContext.Provider value={dispatch}>
        {children}
        <ToggleLogin
          toggleLogin={toggle.toggleLogin}
          message="로그인이 필요한 기능입니다. 로그인 또는 회원가입을 진행해주세요."
        />
      </ToggleDispatchContext.Provider>
    </ToggleStateContext.Provider>
  );
};

export default ToggleContextProvider;
