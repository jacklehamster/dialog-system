import { DialogModel } from "./DialogModel";
import { Layout } from "../common/layout/Layout";
import { MenuModel } from "../menu/model/MenuModel";

export interface PopStep {
  dialog?: DialogModel;
  menu?: MenuModel;
  layout?: Layout;
}
