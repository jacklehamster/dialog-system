export interface LayoutModel {
  name?: string;
  position?: [number | undefined, number | undefined];
  size?: [number | undefined, number | undefined];
  positionFromRight?: boolean;
  positionFromBottom?: boolean;
}

export type Layout = LayoutModel | string;
