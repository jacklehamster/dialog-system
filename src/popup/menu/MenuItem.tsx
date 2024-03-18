import { PopAction } from '../actions/PopAction';
import { MenuItemBehavior } from './MenuItemBehavior';

export interface MenuItemModel {
  label: string;
  action?: PopAction | (PopAction | undefined)[];
  behavior?: MenuItemBehavior;
}

export type MenuItem = MenuItemModel | string;
