import { useCallback, useReducer, useRef } from 'react';

type Action = 'SET_SIZE' | 'SET_TRANSFORM_RIGHT' | 'SET_TRANSFORM_LEFT';

interface IAction {
  type: Action;
  size?: number;
  width?: number;
}

interface IStateProps {
  transformWidth: number;
  size: number;
  currentListSize: number;
}

function reducer(state: IStateProps, action: IAction) {
  switch (action.type) {
    case 'SET_SIZE':
      if (action.size) {
        return {
          ...state,
          size: action.size,
          currentListSize: action.size,
        };
      } else {
        throw new Error('Cannot find action size payload');
      }
    case 'SET_TRANSFORM_RIGHT':
      if (action.width) {
        return {
          ...state,
          transformWidth: state.transformWidth + action.width,
          currentListSize: state.currentListSize + state.size,
        };
      } else {
        throw new Error('Cannot find action width payload');
      }
    case 'SET_TRANSFORM_LEFT':
      if (action.width) {
        return {
          ...state,
          transformWidth: state.transformWidth + action.width,
          currentListSize: state.currentListSize - state.size,
        };
      } else {
        throw new Error('Cannot find action width payload');
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useListTransform() {
  const [state, dispatch] = useReducer(reducer, {
    transformWidth: 0,
    size: 0,
    currentListSize: 0,
  });

  const ulElementRef = useRef<HTMLUListElement>(null);

  const setSize = useCallback(
    (size: number) => dispatch({ type: 'SET_SIZE', size }),
    []
  );

  const handleSwipe: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      let width = 0;
      if (ulElementRef.current) {
        width = ulElementRef.current.clientWidth;
      }
      if (e.currentTarget.parentElement) {
        const dir = e.currentTarget.parentElement.getAttribute('dir');
        if (dir === 'left') {
          dispatch({ type: 'SET_TRANSFORM_LEFT', width: -width });
        }
        if (dir === 'right') {
          dispatch({ type: 'SET_TRANSFORM_RIGHT', width });
        }
      }
    },
    []
  );

  return {
    state,
    ulElementRef,
    setSize,
    handleSwipe,
  };
}

export default useListTransform;
