import { Layout } from "./Layout";

export interface Style {
  fontSize?: number;
}

export interface PopupModel {
  uid?: string;
  layout?: Layout;
  style?: Style;
}
