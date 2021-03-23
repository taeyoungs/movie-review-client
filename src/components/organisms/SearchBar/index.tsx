import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import P, { TextAlign } from 'components/atoms/P';
import { MenuButton } from 'components/molecules/Menu/WithEmotion';
import Menu from 'components/molecules/Menu';
import MenuItem from 'components/atoms/MenuItem';
import SearchBarItem from 'components/molecules/SearchBarItem';
import {
  Container,
  SearchbarInput,
  RelativeContainer,
  ResultContainer,
  LoadingContainer,
} from './WithEmotion';
import { MULTI_SEARCH_QUERY } from 'queries/Query';
import Icon, { IconType } from 'Icon/Icon';
import { ColorPalette } from 'models/color';
import { ISearchProps } from 'models/types';
import Loading from 'products/Loading';

// ToDo: media-query
// ToDo: 전체 검색 결과 보기

interface IProps {
  multiSearch: Array<ISearchProps>;
}

const SearchBar: React.FunctionComponent = () => {
  const [title, setTitle] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
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

  return (
    <RelativeContainer>
      <Container isFocus={isFocus}>
        <div
          style={{ position: 'relative' }}
          onMouseLeave={() => setIsOpen(false)}
        >
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
        </div>
        <SearchbarInput
          placeholder="제목 또는 이름으로 검색해보세요."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
          onChange={handleChange}
        />
      </Container>
      {value != '' && (
        <ResultContainer>
          {loading ? (
            <Loading />
          ) : data && data.multiSearch.length > 10 ? (
            data.multiSearch
              .slice(0, 9)
              .map((item) => <SearchBarItem key={item.id} {...item} />)
          ) : (
            data?.multiSearch.map((item) => (
              <SearchBarItem key={item.id} {...item} />
            ))
          )}
          {data && data.multiSearch.length === 0 && (
            <LoadingContainer>
              <P
                align={TextAlign.CENTER}
                color={ColorPalette.Yellow.YELLOW_600}
              >
                검색 결과가 존재하지 않습니다.
              </P>
            </LoadingContainer>
          )}
        </ResultContainer>
      )}
    </RelativeContainer>
  );
};

export default SearchBar;
