import { useContext } from 'react';
import { ToggleStateContext } from 'components/molecules/ToggleContextProvider';

const useToggleState = () => {
  const state = useContext(ToggleStateContext);

  if (!state) throw new Error('Cannot find ToggleState Context');

  return state;
};

export default useToggleState;
