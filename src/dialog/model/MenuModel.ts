import { List } from "abstract-list";
import { MenuItem } from './MenuItem';
import { MenuBehavior } from "./MenuBehavior";
import { PopupModel } from "./PopupModel";

export interface MenuModel extends PopupModel {
  items: List<MenuItem> | MenuItem[];
  maxRows?: number;
  behavior?: MenuBehavior;
  state?: {
    uid: string;
    index: number;
  };
}
