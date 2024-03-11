import { Layout } from "./Layout";

export interface Style {
  fontSize?: number;
}

export interface PopupData {
  uid?: string;
  type?: "menu" | "dialog";
  layout?: Layout;
  style?: Style;
}
