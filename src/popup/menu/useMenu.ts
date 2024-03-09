import { useMemo } from "react";
import { UserInterface } from "../UserInterface";
import { MenuData } from "./MenuData";
import { useSelection } from "./useSelection";
import { useActions } from "../actions/useActions";
import { MenuItem } from "./MenuItem";
import { MenuItemBehavior } from '../menu/MenuItemBehavior';
import { useControlsLock } from "../controls/useControlsLock";
import { PopupControlListener } from "../controls/PopupControlListener";

interface Props {
  menuData: MenuData;
  ui: UserInterface;
  onDone(): void;
}

interface Result {
  selectedItem?: MenuItem;
}

export function useMenu({ menuData, ui, onDone }: Props): Result {
  const { moveSelection, selectedItem } = useSelection({ menuData });
  const { performActions } = useActions({ ui });

  const listener = useMemo<PopupControlListener>(() => ({
    onAction() {
      const behavior = selectedItem?.behavior ?? MenuItemBehavior.CLOSE_ON_SELECT;
      if (behavior === MenuItemBehavior.CLOSE_ON_SELECT) {
        ui.closePopup(menuData.uid);
      }
      const selectedAction = selectedItem?.action;
      const actions = Array.isArray(selectedAction) ? selectedAction : [selectedAction];
      performActions(actions).then(() => {
        if (behavior === MenuItemBehavior.CLOSE_AFTER_SELECT) {
          ui.closePopup(menuData.uid);
        }
        if (behavior !== MenuItemBehavior.NONE) {
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

  useControlsLock({ uid: menuData.uid, listener });

  return { selectedItem };
}
