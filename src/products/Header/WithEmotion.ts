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
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px auto;
  width: 1280px;
`;

const SLink = styled(Link)`
  text-decoration: none;
  margin: 0 10px;
`;

export { HeaderContainer, MenuContainer, SLink };
