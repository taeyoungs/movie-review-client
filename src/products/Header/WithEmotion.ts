import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const HeaderContainer = styled.nav`
  display: flex;
  width: 100%;
  height: 3.5rem;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.25rem;
  background: #1f1f1f;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px;
  width: 100vw;
  @media (min-width: 600px) {
    padding: 0px 0.75rem;
  }
  @media (min-width: 1024px) {
    width: 1024px;
    margin: 0px auto;
  }
  @media (min-width: 1280px) {
    width: 1280px;
    margin: 0px auto;
  }
`;

const SLink = styled(Link)`
  text-decoration: none;
  margin: 0 10px;
`;

export { HeaderContainer, MenuContainer, SLink };
