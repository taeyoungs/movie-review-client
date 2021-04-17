import React, { useEffect, useState } from 'react';
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
} from './WithEmotion';
import { MULTI_SEARCH_QUERY } from 'queries/Query';
import Icon, { IconType } from 'Icon/Icon';
import { ColorPalette } from 'models/color';
import { ISearchProps } from 'models/types';

interface IProps {
  multiSearch: Array<ISearchProps>;
}

const SearchBar: React.FunctionComponent = () => {
  const [title, setTitle] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [getResults, { loading, data }] = useLazyQuery<IProps>(
    MULTI_SEARCH_QUERY
  );
  const itemTitleList = ['All', '영화', 'TV 프로그램', '사람'];
  const iconTitleList: Array<IconType> = ['search', 'movie', 'show', 'person'];

  useEffect(() => {
    if (value != '') {
      const searchType =
        title === 'All'
          ? 'multi'
          : title === '영화'
          ? 'movie'
          : title === 'TV 프로그램'
          ? 'tv'
          : 'person';
      getResults({ variables: { term: value, page: 1, searchType } });
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const toggleShadow = () => {
    const inputContainer = document.querySelector('.searchbar-container');
    if (inputContainer) {
      if (!inputContainer.classList.contains('focus-shadow')) {
        inputContainer.classList.add('focus-shadow');
      } else {
        inputContainer.classList.remove('focus-shadow');
      }
    }
  };

  const handleExit = () => {
    const inputContainer = document.querySelector('.relative-container');
    if (inputContainer) {
      inputContainer.classList.remove('open');
    }
  };

  const handleResultClick: React.MouseEventHandler<HTMLUListElement> = (e) => {
    if (e.target) {
      setValue('');
    }
  };

  return (
    <RelativeContainer className="relative-container">
      <Container className="searchbar-container">
        <MenuContainer onMouseLeave={() => setIsOpen(false)}>
          <MenuButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
            {title}
            <Icon
              icon="cone"
              color={ColorPalette.Neutral.NEUTRAL_1000}
              size={8}
            />
          </MenuButton>
          <Menu isOpen={isOpen}>
            {itemTitleList.map((item, index) => (
              <MenuItem
                key={index}
                title={item}
                selected={title === item}
                onClick={() => {
                  setTitle(item);
                  setIsOpen(false);
                  setValue('');
                }}
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
          value={value}
          onChange={handleChange}
        />
        <ExitIcon
          onClick={() => {
            handleExit();
            setValue('');
          }}
        >
          <Icon icon="cross" color={ColorPalette.Neutral.NEUTRAL_0} size={14} />
        </ExitIcon>
      </Container>
      {value != '' && (
        <ResultContainer onClick={handleResultClick}>
          {loading ? (
            <Loading />
          ) : (
            data && <ResultSection multiSearch={data.multiSearch} />
          )}
        </ResultContainer>
      )}
    </RelativeContainer>
  );
};

export default SearchBar;
