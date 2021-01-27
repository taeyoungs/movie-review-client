export interface IComponentProps {
  isCapturing?: boolean;
  /** 임의로 margin 속성을 설정합니다. */
  margin?: [number, number?, number?, number?];
  /** 임의로 margin 속성을 설정합니다. */
  padding?: [number, number?, number?, number?];
  style?: Record<string, string | number>;
  className?: string;
}
