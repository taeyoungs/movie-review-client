import { useContext } from 'react';
import {
  ActiveIndexDispatchContext,
  ActiveIndexDispatch,
} from 'components/molecules/ActiveIndexContextProvider';

function useAIndexDisptach(): ActiveIndexDispatch {
  const dispatch = useContext(ActiveIndexDispatchContext);

  return dispatch;
}

export default useAIndexDisptach;
