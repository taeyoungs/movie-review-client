import { useContext } from 'react';
import {
  CategoryStateContext,
  ICategoryProps,
} from 'components/molecules/CategoryContextProvider';

function useCategoryState(): ICategoryProps {
  const state = useContext(CategoryStateContext);

  return state;
}

export default useCategoryState;
