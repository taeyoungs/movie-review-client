import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ICastProps } from 'models/types';
import { ColorPalette } from 'models/color';

const CastItemContainer = styled.li`
  padding-right: 15px;
  width: 100%;
  @media (min-width: 720px) {
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
  &:nth-of-type(3n) .info-container {
    border-bottom: none;
  }
`;

const PersonContainer = styled.div`
  position: relative;
`;

const PersonInner = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  overflow: hidden;
  margin: 0 12px 0 0;
  border: none;
`;

const Person = styled.div<{ url?: string }>`
  border-radius: 5px;
  ${(props) =>
    props.url
      ? `
    background-image: url(https://image.tmdb.org/t/p/w500${props.url});
  `
      : `
    background-color: #e5e5e5;
  `}
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const PersonInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  border-bottom: 1px solid #f0f0f0;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PersonInfoInner = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Name = styled.div`
  color: ${ColorPalette.Main.TEXT_BODY};
  font-size: 17px;
  letter-spacing: -0.7px;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Character = styled.div`
  color: #8c8c8c;
  font-size: 13px;
  letter-spacing: -0.3px;
  line-height: 19px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;

const ELink = styled(Link)`
  width: 100%;
  display: flex;
  height: 76px;
  align-items: center;
`;

interface IProps {
  cast: ICastProps;
}

function CastItem({ cast }: IProps): JSX.Element {
  return (
    <CastItemContainer>
      <ELink to={`/person/${cast.id}`}>
        <PersonContainer>
          <PersonInner>
            <Person url={cast.profile_path}></Person>
          </PersonInner>
        </PersonContainer>
        <PersonInfoContainer className="info-container">
          <PersonInfoInner>
            <Name>{cast.name}</Name>
            <Character>{cast.character}</Character>
          </PersonInfoInner>
        </PersonInfoContainer>
      </ELink>
    </CastItemContainer>
  );
}

export default React.memo(CastItem);
