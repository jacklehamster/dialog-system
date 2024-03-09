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
}

export function useMenu({ menuData, ui, onDone }: Props): Result {
  const { scroll, scrollUp, scrollDown, select, moveSelection, selectedItem } = useSelection({ menuData });
  const { performActions } = useActions({ ui });
  const [menuHoverEnabled, setMenuHoverEnabled] = useState(false);

  const listener = useMemo<PopupControlListener>(() => ({
    onAction() {
      if (selectedItem?.disabled) {
        return;
      }
      const behavior = selectedItem?.behavior ?? MenuItemBehavior.CLOSE_ON_SELECT;
      if (behavior === MenuItemBehavior.CLOSE_ON_SELECT) {
        ui.closePopup(menuData.uid);
      }
      const selectedAction = selectedItem?.action;
      const actions = Array.isArray(selectedAction) ? selectedAction : [selectedAction];
      performActions(actions, { keepMenu: behavior === MenuItemBehavior.NONE }).then(state => {
        if (behavior === MenuItemBehavior.CLOSE_AFTER_SELECT) {
          ui.closePopup(menuData.uid);
        }
        if (!state.keepMenu) {
          onDone();
        }
      });
    },
    onUp() {
      setMenuHoverEnabled(false);
      moveSelection(-1);
    },
    onDown() {
      setMenuHoverEnabled(false);
      moveSelection(1);
    },
  }), [menuData, moveSelection, selectedItem, performActions, setMenuHoverEnabled]);

  const { lockState } = useControlsLock({ uid: menuData.uid, listener });
  const enableMenuHover = useCallback(!menuHoverEnabled ? () => {
    setMenuHoverEnabled(true);
  } : () => { }, [menuHoverEnabled]);

  return {
    selectedItem,
    select,
    scroll,
    scrollUp,
    scrollDown,
    disabled: lockState === LockStatus.LOCKED,
    menuHoverEnabled,
    enableMenuHover,
  };
}
