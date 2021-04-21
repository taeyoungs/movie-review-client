import { useContext } from 'react';
import { ToggleDispatchContext } from 'components/molecules/ToggleContextProvider';

const useToggleDispatch = () => {
  const dispatch = useContext(ToggleDispatchContext);

  if (!dispatch) throw new Error('Cannot find ToggleContext Provider');

  return dispatch;
};

export default useToggleDispatch;
