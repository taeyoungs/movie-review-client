import React, { createContext, Dispatch, useReducer } from 'react';

export interface ICategoryProps {
  category: string;
  panel: boolean;
}

type Action = 'SET_CATEGORY' | 'TOGGLE_PANEL';

interface IAction {
  type: Action;
  content?: string;
}

function reducer(state: ICategoryProps, action: IAction) {
  switch (action.type) {
    case 'TOGGLE_PANEL':
      return {
        ...state,
        panel: !state.panel,
      };
    case 'SET_CATEGORY':
      const category = action.content;
      if (category) {
        return {
          ...state,
          category,
        };
      } else {
        throw new Error('Unhandled category type');
      }
    default:
      throw new Error('Unhandled action');
  }
}

export type CategoryDispatch = Dispatch<IAction>;

export const CategoryStateContext = createContext<ICategoryProps>({
  category: 'popular',
  panel: true,
});
export const CategoryDispatchContext = createContext<CategoryDispatch>(
  () => null
);

function CategoryContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    category: 'popular',
    panel: true,
  });

  return (
    <CategoryStateContext.Provider value={state}>
      <CategoryDispatchContext.Provider value={dispatch}>
        {children}
      </CategoryDispatchContext.Provider>
    </CategoryStateContext.Provider>
  );
}

export default CategoryContextProvider;
