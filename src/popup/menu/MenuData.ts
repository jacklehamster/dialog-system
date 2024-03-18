import { List } from "abstract-list";
import { MenuItem } from './MenuItem';
import { PopupData } from "../base/PopupData";
import { MenuBehavior } from "./MenuBehavior";

export interface MenuData extends PopupData {
  type?: "menu",
  items: List<MenuItem> | MenuItem[];
  maxRows?: number;
  behavior?: MenuBehavior;
}
