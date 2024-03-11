import { useCallback, useMemo, useState } from "react";
import { UserInterface } from "../UserInterface";
import { MenuData } from "./MenuData";
import { useSelection } from "./useSelection";
import { useActions } from "../actions/useActions";
import { MenuItem } from "./MenuItem";
import { MenuItemBehavior } from '../menu/MenuItemBehavior';
import { LockStatus, useControlsLock } from "../controls/useControlsLock";
import { PopupControlListener } from "../controls/PopupControlListener";

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
  const { performActions } = useActions({ ui });
  const [menuHoverEnabled, setMenuHoverEnabled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const onMenuAction = useCallback((index?: number) => {
    const item = index !== undefined ? menuData.items.at(index) : selectedItem;
    if (!item || item.disabled) {
      return;
    }
    const behavior = item.behavior ?? MenuItemBehavior.CLOSE_ON_SELECT;
    if (behavior === MenuItemBehavior.CLOSE_ON_SELECT) {
      ui.closePopup(menuData.uid);
    }
    if (behavior === MenuItemBehavior.HIDE_ON_SELECT) {
      setHidden(true);
    }
    const selectedAction = item.action;
    const actions = Array.isArray(selectedAction) ? selectedAction : [selectedAction];
    performActions(actions, { keepMenu: behavior === MenuItemBehavior.NONE || behavior === MenuItemBehavior.HIDE_ON_SELECT }).then(state => {
      if (behavior === MenuItemBehavior.CLOSE_AFTER_SELECT) {
        ui.closePopup(menuData.uid);
      }
      if (!state.keepMenu) {
        onDone();
      }
      if (behavior === MenuItemBehavior.HIDE_ON_SELECT) {
        setHidden(false);
      }
    });
  }, [menuData, moveSelection, selectedItem, performActions, setMenuHoverEnabled, setHidden]);

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
    enableMenuHover: useCallback(!menuHoverEnabled ? () => {
      setMenuHoverEnabled(true);
    } : () => { }, [menuHoverEnabled]),
    hidden,
    onMenuAction,
  };
}
