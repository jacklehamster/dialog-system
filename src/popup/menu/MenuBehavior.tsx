export enum MenuBehaviorEnum {
  NONE,
  CLOSE_ON_SELECT,
  CLOSE_AFTER_SELECT,
  HIDE_ON_SELECT,
}

export const MenuItemBehaviorDefault = MenuBehaviorEnum.NONE;

export type MenuBehavior = keyof typeof MenuBehaviorEnum | MenuBehaviorEnum;

export function getBehavior(behavior?: MenuBehavior): MenuBehaviorEnum {
  if (typeof(behavior) === "string") {
    return MenuBehaviorEnum[behavior] ?? MenuItemBehaviorDefault;
  } else {
    return behavior ?? MenuItemBehaviorDefault;
  }
}
