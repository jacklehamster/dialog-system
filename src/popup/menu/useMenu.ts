import { useCallback, useMemo, useState } from "react";
import { UserInterface } from "../UserInterface";
import { MenuData } from "./MenuData";
import { useSelection } from "./useSelection";
import { MenuItem } from "./MenuItem";
import { MenuBehaviorEnum, getBehavior } from './MenuBehavior';
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
    const itemFlex = index !== undefined ? menuData.items.at(index) : selectedItem;
    const item = typeof (itemFlex) === "string" ? { label: itemFlex } : itemFlex;
    if (!item) {
      return;
    }
    const behavior = getBehavior(item.behavior ?? menuData.behavior);
    if (behavior === MenuBehaviorEnum.CLOSE_ON_SELECT) {
      closePopup(menuData.uid);
    }
    if (behavior === MenuBehaviorEnum.HIDE_ON_SELECT) {
      setHidden(true);
    }
    const selectedAction = item.action;
    const actions = Array.isArray(selectedAction) ? selectedAction : [selectedAction];
    ui.performActions(actions, { keepMenu: behavior === MenuBehaviorEnum.NONE || behavior === MenuBehaviorEnum.HIDE_ON_SELECT }, (state) => {
      if (behavior === MenuBehaviorEnum.CLOSE_AFTER_SELECT) {
        closePopup(menuData.uid);
      }
      if (!state.keepMenu) {
        onDone();
      }
      if (behavior === MenuBehaviorEnum.HIDE_ON_SELECT) {
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
