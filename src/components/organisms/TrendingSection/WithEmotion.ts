import styled from '@emotion/styled';
import { ColorPalette } from 'models/color';

const ToggleBtn = styled.label`
  color: #000;
  background-color: #fff;
  border-radius: 20px;
  display: inline-flex;
  justify-content: space-around;
  margin: 0 10px;
  cursor: pointer;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 65px;
    height: 25px;
    background-color: ${ColorPalette.Main.CTA_PRIMARY};
    border-radius: 20px;
    z-index: 2;
    transition: 0.3s ease-in-out;
  }
  &:nth-of-type(1) {
    margin-left: 30px;
  }
`;

const HiddenBox = styled.input`
  display: none;
  &:nth-of-type(1):checked + label::before {
    transform: translateX(64px);
    width: 55px;
  }
  &:nth-of-type(2):checked + label::before {
    transform: translateX(65px);
    width: 80px;
  }
`;

const ToggleText = styled.span`
  display: inline-block;
  font-size: 14px;
  padding: 8px 20px;
  font-weight: 300;
  z-index: 3;
`;

export { ToggleBtn, HiddenBox, ToggleText };
