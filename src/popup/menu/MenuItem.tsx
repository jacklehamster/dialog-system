import { PopAction } from '../actions/PopAction';
import { MenuBehavior } from './MenuBehavior';

export interface MenuItemModel {
  label: string;
  action?: PopAction | (PopAction | undefined)[];
  behavior?: MenuBehavior;
}

export type MenuItem = MenuItemModel | string;
