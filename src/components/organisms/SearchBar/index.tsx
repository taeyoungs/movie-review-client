import React, { useCallback, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import MenuItem from 'components/atoms/MenuItem';
import Menu from 'components/molecules/Menu';
import ResultSection from 'components/organisms/ResultSection';
import Loading from 'products/Loading';
import {
  Container,
  SearchbarInput,
  RelativeContainer,
  ResultContainer,
  MenuButton,
  MenuContainer,
  ExitIcon,
  Wrapper,
} from './WithEmotion';
import { MULTI_SEARCH_QUERY } from 'queries/Query';
import useInputs from 'hooks/useInputs';
import { ColorPalette } from 'models/color';
import { ISearchProps } from 'models/types';
import Icon, { IconType } from 'Icon/Icon';

interface IProps {
  multiSearch: Array<ISearchProps>;
}

const iconTitleList: Array<IconType> = ['search', 'movie', 'show', 'person'];
const itemObject = {
  multi: 'All',
  movie: '영화',
  tv: 'TV 프로그램',
  person: '사람',
};

interface IStateProps {
  title: string;
  isOpen: boolean;
  searchType: string;
}

type Action = 'TOGGLE_MENU' | 'CLOSE_MENU' | 'CHANGE_MENU';
interface IAction {
  type: Action;
  title?: string;
  isOpen?: boolean;
  searchType?: string;
}

function searchReducer(state: IStateProps, action: IAction) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case 'CLOSE_MENU':
      return {
        ...state,
        isOpen: false,
      };
    case 'CHANGE_MENU':
      return {
        ...state,
        isOpen: false,
        term: '',
        ...(action.title && { title: action.title }),
        ...(action.searchType && { searchType: action.searchType }),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const SearchBar: React.FunctionComponent = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(searchReducer, {
    title: 'All',
    isOpen: false,
    searchType: 'multi',
  });

  const { form, onChange, reset } = useInputs({
    term: '',
  });

  const { title, isOpen, searchType } = state;
  const { term } = form;

  const [getResults, { loading, data }] = useLazyQuery<IProps>(
    MULTI_SEARCH_QUERY
  );

  useEffect(() => {
    if (term != '') {
      getResults({ variables: { term, page: 1, searchType } });
    }
  }, [term]);

  const toggleShadow = useCallback(() => {
    const inputContainer = document.querySelector('.searchbar-container');
    if (inputContainer) {
      if (!inputContainer.classList.contains('focus-shadow')) {
        inputContainer.classList.add('focus-shadow');
      } else {
        inputContainer.classList.remove('focus-shadow');
      }
    }
  }, []);

  const handleExit = useCallback(() => {
    const inputContainer = document.querySelector('.relative-container');
    if (inputContainer) {
      inputContainer.classList.remove('open');
    }
    reset();
  }, []);

  const handleResultClick: React.MouseEventHandler<HTMLUListElement> = useCallback(
    (e) => {
      if (e.target) {
        handleExit();
      }
    },
    []
  );

  const handleMenuClose = useCallback(() => {
    dispatch({ type: 'CLOSE_MENU' });
  }, []);

  const handleMenuToggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_MENU' });
  }, []);

  const handleMenuChange = (key: string, value: string) => {
    dispatch({ type: 'CHANGE_MENU', title: value, searchType: key });
    reset();
  };

  const handleInputEnter: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleExit();
        switch (searchType) {
          case 'multi':
            history.push(`/search?query=${term}`);
            break;
          case 'movie':
            history.push(`/search/movie?query=${term}`);
            break;
          case 'tv':
            history.push(`/search/tv?query=${term}`);
            break;
          case 'person':
            history.push(`/search/person?query=${term}`);
            break;
          default:
            throw new Error(`Unhandled search type: ${searchType}`);
        }
      }
    },
    [searchType, term]
  );

  return (
    <RelativeContainer className="relative-container">
      <Container className="searchbar-container">
        <MenuContainer onMouseLeave={handleMenuClose}>
          <MenuButton onClick={handleMenuToggle} isOpen={isOpen}>
            {title}
            <Icon
              icon="cone"
              color={ColorPalette.Neutral.NEUTRAL_1000}
              size={8}
            />
          </MenuButton>
          <Menu isOpen={isOpen}>
            {Object.entries(itemObject).map(([key, value], index) => (
              <MenuItem
                key={index}
                title={value}
                selected={title === value}
                name={key}
                onClick={() => handleMenuChange(key, value)}
                iconName={iconTitleList[index]}
              />
            ))}
          </Menu>
        </MenuContainer>
        <SearchbarInput
          className="searchbar-input"
          placeholder="제목 또는 이름으로 검색해보세요."
          onFocus={toggleShadow}
          onBlur={toggleShadow}
          value={term}
          onChange={onChange}
          onKeyDown={handleInputEnter}
          name="term"
        />
        <ExitIcon onClick={handleExit}>
          <Icon icon="cross" color={ColorPalette.Neutral.NEUTRAL_0} size={14} />
        </ExitIcon>
      </Container>
      {term != '' && (
        <Wrapper>
          <ResultContainer onClick={handleResultClick}>
            {loading ? (
              <Loading />
            ) : (
              data && <ResultSection multiSearch={data.multiSearch} />
            )}
          </ResultContainer>
        </Wrapper>
      )}
    </RelativeContainer>
  );
};

export default SearchBar;
