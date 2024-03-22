import { ActionScript } from './ActionScript';
import { MenuBehavior } from './MenuBehavior';

export interface MenuItemModel {
  label: string;
  actions?: ActionScript;
  behavior?: MenuBehavior;
}

export type MenuItem = MenuItemModel | string;
