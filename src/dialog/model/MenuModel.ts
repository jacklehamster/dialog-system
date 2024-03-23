import { List } from "abstract-list";
import { MenuItem } from './MenuItem';
import { MenuBehavior } from "./MenuBehavior";
import { PopupModel } from "./PopupModel";
import { State } from "../state/State";

export interface MenuModel extends PopupModel, State {
  items: List<MenuItem> | MenuItem[];
  maxRows?: number;
  behavior?: MenuBehavior;
}
