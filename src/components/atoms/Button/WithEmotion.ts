import styled from '@emotion/styled';
import { ButtonAppearance, ButtonSize } from '.';

interface IStyleProps {
  size: ButtonSize;
  appearance: ButtonAppearance;
  disabled: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flexwrap: wrap;
  align-items: center;
  & button {
    margin-right: 1.5em;
  }
`;

const EButton = styled.button<IStyleProps>`
  outline: none;
  border: none;
  cursor: pointer;
  background: #f1c40f;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  font-weight: 600;
  padding: 0 1rem;
  color: black;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    background: rgba(241, 196, 15, 0.4);
    color: rgba(0, 0, 0, 0.4);
    cursor: default
  }
  ${(props) =>
    props.size === 'big' &&
    `
    height: 2.5rem;
    font-size: 1.125rem;
    padding: 0 1.5rem;
  `}
  ${(props) =>
    props.size === 'medium' &&
    `
    height: 2rem;
    font-size: 1rem;
    padding: 0 1rem;
  `}
  ${(props) =>
    props.size === 'small' &&
    `
    height: 1.75rem;
    font-size: 0.75rem;
    padding: 0 0.875rem;
  `}
  ${(props) =>
    props.appearance === 'default' &&
    `
    &:hover:enabled {
        background: #dfb50d;
    }
  `}
  ${(props) =>
    props.appearance === 'primary' &&
    `
    background: black;
    color: white;
    &:hover:enabled {
        background: rgba(0, 0, 0, 0.7);
    }
    &:disabled {
        background: rgba(0, 0, 0, 0.1);
    }
  `}
  ${(props) =>
    props.appearance === 'secondary' &&
    `
    background: none;
    color: #f1c40f;
    &:hover:enabled {
        color: #dfb50d;
    }
    &:disabled {
        background: none;
        color: rgba(241, 196, 15, 0.4);
    }
  `}
`;

export { EButton, Wrapper };
