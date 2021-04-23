import React, { createContext, Dispatch, useReducer } from 'react';

export interface IAIndexProps {
  activeIndex: number;
}

type Action = 'INCREASE_INDEX' | 'DECREASE_INDEX' | 'SET_INDEX';

interface IAction {
  type: Action;
  index?: number;
}

function reducer(state: IAIndexProps, action: IAction) {
  switch (action.type) {
    case 'INCREASE_INDEX':
      return {
        activeIndex: state.activeIndex + 1,
      };
    case 'DECREASE_INDEX':
      return {
        activeIndex: state.activeIndex - 1,
      };
    case 'SET_INDEX':
      if (action.index) {
        return {
          activeIndex: action.index,
        };
      } else {
        throw new Error('Invalid index');
      }
    default:
      throw new Error('Unhandled action');
  }
}

export type ActiveIndexDispatch = Dispatch<IAction>;

export const ActiveIndexStateContext = createContext<IAIndexProps>({
  activeIndex: 1,
});
export const ActiveIndexDispatchContext = createContext<ActiveIndexDispatch>(
  () => null
);

function ActiveIndexContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [index, dispatch] = useReducer(reducer, {
    activeIndex: 1,
  });

  return (
    <ActiveIndexStateContext.Provider value={index}>
      <ActiveIndexDispatchContext.Provider value={dispatch}>
        {children}
      </ActiveIndexDispatchContext.Provider>
    </ActiveIndexStateContext.Provider>
  );
}

export default ActiveIndexContextProvider;
