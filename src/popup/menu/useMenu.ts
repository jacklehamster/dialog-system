import { useMemo } from "react";
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
  select(index: number): void;
  disabled: boolean;
  scroll: number;
  scrollUp(): void;
  scrollDown(): void;
}

export function useMenu({ menuData, ui, onDone }: Props): Result {
  const { scroll, scrollUp, scrollDown, select, moveSelection, selectedItem } = useSelection({ menuData });
  const { performActions } = useActions({ ui });

  const listener = useMemo<PopupControlListener>(() => ({
    onAction() {
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
      moveSelection(-1);
    },
    onDown() {
      moveSelection(1);
    },
  }), [moveSelection, selectedItem, performActions]);

  const { lockState } = useControlsLock({ uid: menuData.uid, listener });

  return { selectedItem, select, scroll, scrollUp, scrollDown, disabled: lockState === LockStatus.LOCKED };
}
