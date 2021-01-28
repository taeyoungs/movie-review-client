import React from 'react';
import Icon from 'Icon/Icon';
import { Wrapper, PEInput, PELabel, InnerWrapper, Error } from './WithEmotion';

export enum InputAppearance {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  PILL = 'pill',
}

export enum InputOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export interface IProps {
  /** label htmlFor를 위한 id 속성 */
  id: string;
  /** input value */
  value?: string;
  /** input의 종류를 설정합니다. */
  appearance?: InputAppearance;
  /** label과 input의 정렬 속성을 설정합니다. */
  orientation?: InputOrientation;
  /** label 숨김 여부 */
  hideLabel?: boolean;
  icon?: 'menu' | 'user' | 'youtube';
  /** label의 텍스트를 설정합니다. */
  label: string;
  /** error 텍스트를 설정합니다. */
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Input: React.FC<IProps> = ({
  id,
  value,
  appearance = InputAppearance.DEFAULT,
  orientation = InputOrientation.VERTICAL,
  hideLabel = false,
  icon,
  label = 'Label',
  onChange,
  error,
  placeholder,
  disabled,
}) => {
  return (
    <Wrapper orientation={orientation}>
      {hideLabel ? null : (
        <PELabel orientation={orientation} htmlFor={id}>
          {label}
        </PELabel>
      )}
      <InnerWrapper orientation={orientation} error={error}>
        {icon ? <Icon icon={icon} /> : null}
        <PEInput
          id={id}
          value={value}
          appearance={appearance}
          onChange={onChange}
          error={error}
          placeholder={placeholder}
          disabled={disabled}
        />
        <Error error={error}>{error}</Error>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Input;
