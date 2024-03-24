import { ActionScript } from '../model/ActionScript';
import { MenuBehavior } from './MenuBehavior';
import { MenuItemModel } from '../menu/model/MenuItemModel';

export interface ActionMenuItemModel extends MenuItemModel {
  actions?: ActionScript;
  behavior?: MenuBehavior;
}

export type ActionMenuItem = ActionMenuItemModel | string;
