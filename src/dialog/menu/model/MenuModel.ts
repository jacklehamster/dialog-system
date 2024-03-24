import { List } from "abstract-list";
import { PopupModel } from "../../common/PopupModel";
import { DialogState } from "../../common/DialogState";
import { MenuItem } from "./MenuItemModel";
import { MenuBehavior } from "../../../dialog/wrapper/MenuBehavior";

export interface MenuModel extends PopupModel, DialogState {
  items: List<MenuItem> | MenuItem[];
  maxRows?: number;
  behavior: MenuBehavior
}
