import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import useCategoryDispatch from 'hooks/useCategoryDispatch';
import useCategoryState from 'hooks/useCategoryState';
import Icon from 'Icon/Icon';

const CategoryPanelContainer = styled.div`
  margin-bottom: 20px;
  @media (min-width: 720px) {
    margin-bottom: 0;
  }
`;

const CategoryPanel = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  width: 100%;
  @media (min-width: 720px) {
    width: 240px;
  }
`;

const CategoryPanelInner = styled.div<{ panel: boolean }>`
  padding: 15px;
  &:first-of-type {
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
  }
  ${(props) =>
    !props.panel &&
    `
    &:nth-of-type(2) {
      display: none;
    }
  `}
`;

const PanelTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h2 {
    font-weight: 700;
    font-size: 18px;
  }
`;

const PanelArrow = styled.div<{ panel: boolean }>`
  display: flex;
  transition: transform 200ms ease-in-out;
  transform: rotate(90deg);
  ${(props) =>
    !props.panel &&
    `
    transform: rotate(0deg);
  `}
`;

const PanelList = styled.ul`
  line-height: 22px;
  letter-spacing: -0.2px;
`;

const PanelItem = styled.li<{ selected: boolean }>`
  padding: 5px 0px 5px 8px;
  margin-bottom: 5px;
  cursor: pointer;
  ${(props) =>
    props.selected &&
    `
    border-radius: 4px;
    background-color: #ffe16e;
  `}
  &:hover {
    border-radius: 4px;
    background-color: #ffe16e;
  }
`;

interface IProps {
  mediaType: string;
  movieCategory: {
    [key: string]: string;
  };
  showCategory: {
    [key: string]: string;
  };
}

function Panel({
  mediaType,
  movieCategory,
  showCategory,
}: IProps): JSX.Element {
  const state = useCategoryState();
  const dispatch = useCategoryDispatch();

  const { category, panel } = state;

  const handlePanelToggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_PANEL' });
  }, []);

  const handleCategory: React.MouseEventHandler<HTMLUListElement> = useCallback(
    (e) => {
      if (e.target instanceof HTMLElement && e.target.tagName === 'LI') {
        const category = e.target.dataset.category;
        if (category) {
          dispatch({ type: 'SET_CATEGORY', content: category });
        }
      }
    },
    [mediaType]
  );

  return (
    <CategoryPanelContainer>
      <CategoryPanel>
        <CategoryPanelInner onClick={handlePanelToggle} panel={panel}>
          <PanelTitle>
            <h2>카테고리</h2>
            <PanelArrow panel={state.panel}>
              <Icon icon="arrowRight" color="#000" size={12} />
            </PanelArrow>
          </PanelTitle>
        </CategoryPanelInner>
        <CategoryPanelInner panel={panel}>
          {mediaType === 'movie' ? (
            <PanelList onClick={handleCategory}>
              {Object.entries(movieCategory).map(function (
                [key, value],
                index
              ) {
                return (
                  <PanelItem
                    key={index}
                    data-category={key}
                    selected={key === category}
                  >
                    {value}
                  </PanelItem>
                );
              })}
            </PanelList>
          ) : (
            <PanelList onClick={handleCategory}>
              {Object.entries(showCategory).map(function ([key, value], index) {
                return (
                  <PanelItem
                    key={index}
                    data-category={key}
                    selected={key === category}
                  >
                    {value}
                  </PanelItem>
                );
              })}
            </PanelList>
          )}
        </CategoryPanelInner>
      </CategoryPanel>
    </CategoryPanelContainer>
  );
}

export default Panel;
