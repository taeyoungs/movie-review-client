import { useContext } from 'react';
import {
  ActiveIndexStateContext,
  IAIndexProps,
} from 'components/molecules/ActiveIndexContextProvider';

function useAIndexState(): IAIndexProps {
  const state = useContext(ActiveIndexStateContext);

  return state;
}

export default useAIndexState;
