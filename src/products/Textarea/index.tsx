import Block, { Sort } from 'components/molecules/Block';
import React from 'react';
import {
  Error,
  InnerWrapper,
  PELabel,
  PETextarea,
  Wrapper,
} from './WithEmotion';

export enum TextAreaAppearance {
  DEFAULT = 'default',
  SECONDARY = 'secondary',
}

export interface IProps {
  /** label htmlFor를 위한 id 속성 */
  id: string;
  /** input value를 설정합니다. */
  value?: string;
  /** input의 종류를 설정합니다. */
  appearance?: TextAreaAppearance;
  /** label 숨김 여부 */
  hideLabel?: boolean;
  /** label의 텍스트를 설정합니다. */
  label: string;
  /** error 텍스트를 설정합니다. */
  error?: string;
  /** resize 옵션을 설정합니다. */
  isResize?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Textarea: React.FC<IProps> = ({
  id,
  value,
  appearance = TextAreaAppearance.DEFAULT,
  hideLabel = true,
  label,
  error,
  onChange,
  placeholder = 'Placeholder',
  disabled,
  isResize = false,
}) => {
  return (
    <Wrapper>
      <Block sort={Sort.TOP_LEFT}>
        {hideLabel ? null : <PELabel htmlFor={id}>{label}</PELabel>}
        <Error error={error}>{error}</Error>
      </Block>
      <InnerWrapper error={error}>
        <PETextarea
          id={id}
          value={value}
          appearance={appearance}
          onChange={onChange}
          error={error}
          placeholder={placeholder}
          disabled={disabled}
          isResize={isResize}
        />
      </InnerWrapper>
    </Wrapper>
  );
};

export default Textarea;
