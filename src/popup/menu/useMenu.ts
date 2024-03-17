import { useCallback, useEffect, useMemo, useState } from "react";
import { UserInterface } from "../UserInterface";
import { MenuData } from "./MenuData";
import { useSelection } from "./useSelection";
import { MenuItem } from "./MenuItem";
import { MenuItemBehavior, MenuItemBehaviorDefault } from '../menu/MenuItemBehavior';
import { LockStatus, useControlsLock } from "../controls/useControlsLock";
import { PopupControlListener } from "../controls/PopupControlListener";
import { useGameContext } from "../context/Provider";

interface Props {
  menuData: MenuData;
  ui: UserInterface;
  onDone(): void;
}

interface Result {
  selectedItem?: MenuItem;
  select(index: number | undefined): void;
  disabled: boolean;
  scroll: number;
  scrollUp(): void;
  scrollDown(): void;
  menuHoverEnabled: boolean;
  enableMenuHover(): void;
  hidden?: boolean;
  onMenuAction(index?: number): void;
}

export function useMenu({ menuData, ui, onDone }: Props): Result {
  const { scroll, scrollUp, scrollDown, select, moveSelection, selectedItem } = useSelection({ menuData });
  const [menuHoverEnabled, setMenuHoverEnabled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { closePopup } = useGameContext();

  const onMenuAction = useCallback((index?: number) => {
    const item = index !== undefined ? menuData.items.at(index) : selectedItem;
    if (!item) {
      return;
    }
    const behavior = item.behavior ?? MenuItemBehaviorDefault;
    if (behavior === MenuItemBehavior.CLOSE_ON_SELECT) {
      closePopup(menuData.uid);
    }
    if (behavior === MenuItemBehavior.HIDE_ON_SELECT) {
      setHidden(true);
    }
    const selectedAction = item.action;
    const actions = Array.isArray(selectedAction) ? selectedAction : [selectedAction];
    ui.performActions(actions, { keepMenu: behavior === MenuItemBehavior.NONE || behavior === MenuItemBehavior.HIDE_ON_SELECT }).then(state => {
      if (behavior === MenuItemBehavior.CLOSE_AFTER_SELECT) {
        closePopup(menuData.uid);
      }
      if (!state.keepMenu) {
        onDone();
      }
      if (behavior === MenuItemBehavior.HIDE_ON_SELECT) {
        setHidden(false);
      }
    });
  }, [menuData, moveSelection, selectedItem, ui, setMenuHoverEnabled, setHidden, closePopup]);

  const { lockState } = useControlsLock({
    uid: menuData.uid,
    listener: useMemo<PopupControlListener>(() => ({
      onAction: onMenuAction,
      onUp() {
        setMenuHoverEnabled(false);
        moveSelection(-1);
      },
      onDown() {
        setMenuHoverEnabled(false);
        moveSelection(1);
      },
    }), [moveSelection, setMenuHoverEnabled, onMenuAction])
  });

  return {
    selectedItem,
    select,
    scroll,
    scrollUp,
    scrollDown,
    disabled: lockState === LockStatus.LOCKED,
    menuHoverEnabled,
    enableMenuHover: useCallback(!menuHoverEnabled
      ? () => setMenuHoverEnabled(true)
      : () => { },
      [menuHoverEnabled]),
    hidden,
    onMenuAction,
  };
}
