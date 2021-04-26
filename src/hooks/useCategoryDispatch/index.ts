import { useContext } from 'react';
import {
  CategoryDispatch,
  CategoryDispatchContext,
} from 'components/molecules/CategoryContextProvider';

function useCategoryDispatch(): CategoryDispatch {
  const dispatch = useContext(CategoryDispatchContext);

  return dispatch;
}

export default useCategoryDispatch;
