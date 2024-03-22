import { DialogModel } from "./DialogModel";
import { Layout } from "./Layout";
import { MenuModel } from "./MenuModel";

export interface PopStep {
  dialog?: DialogModel;
  menu?: MenuModel;
  layout?: Layout;
}
