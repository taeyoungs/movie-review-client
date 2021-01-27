import styled from '@emotion/styled';

interface IStyleProps {
  margin: string;
  padding: string;
  borderRadius: string;
}

const ECard = styled.div<IStyleProps>`
  width: auto;
  height: auto;
  box-sizing: border-box;
  overflow: hidden;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
`;

export default ECard;
