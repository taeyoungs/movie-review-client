import styled from '@emotion/styled';

interface IStyleProps {
  justifyContent: string;
  alignItems: string;
  flexDirection: string;
  margin: string;
  padding: string;
}

const EBlock = styled.div<IStyleProps>`
  display: flex;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-direction: ${(props) => props.flexDirection};
`;

export default EBlock;
