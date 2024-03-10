export interface Layout {
  position?: [number | undefined, number | undefined];
  size?: [number | undefined, number | undefined];
  positionFromRight?: boolean;
  positionFromBottom?: boolean;
}

export interface Style {
  fontSize?: number;
}

export interface PopupData {
  uid?: string;
  type?: "menu" | "dialog";
  layout?: Layout;
  style?: Style;
}
