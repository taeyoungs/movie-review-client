import React, { useState } from 'react';
import { MenuButton } from 'products/Menu/WithEmotion';
import Menu from 'products/Menu';
import styled from '@emotion/styled';
import MenuItem from 'products/MenuItem';
import Icon, { IconType } from 'Icon/Icon';
import { ColorPalette } from 'models/color';
import { Container, SearchbarInput } from './WithEmotion';
import { useLazyQuery, useQuery } from '@apollo/client';
import { MULTI_SEARCH_QUERY } from 'queries/Query';

// ToDo: media-query

const RelativeContainer = styled.div`
  position: relative;
  flex-grow: 1;
`;

const ResultContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 40px;
  background: white;
  border-radius: 0.5em;
`;

const SearchBar: React.FunctionComponent = () => {
  const [title, setTitle] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');
  const [getResults, { loading, data }] = useLazyQuery(MULTI_SEARCH_QUERY);
  const itemTitleList = ['All', '영화', 'TV 프로그램'];
  const iconTitleList: Array<IconType> = ['search', 'movie', 'show'];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    getResults({ variables: { term: value, page: 1 } });
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
      <ResultContainer>
        {loading ? (
          <div>Loading ... </div>
        ) : (
          data &&
          data.multiSearch.map((item: Record<string, string>) => (
            <div>{item.id}</div>
          ))
        )}
      </ResultContainer>
    </RelativeContainer>
  );
};

export default SearchBar;
