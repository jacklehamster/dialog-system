export interface Layout {
  uid?: string;
  position?: [number | undefined, number | undefined];
  size?: [number | undefined, number | undefined];
  positionFromRight?: boolean;
  positionFromBottom?: boolean;
}
