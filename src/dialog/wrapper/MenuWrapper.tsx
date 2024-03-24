import { useCallback, useState } from "react";
import { MenuModel } from "../menu/model/MenuModel";
import { Menu } from "../menu/Menu";
import { ActionMenuItemModel } from "./ActionMenuItem";
import { getBehavior, MenuBehaviorEnum } from "./MenuBehavior";
import { Popup } from "../common/popup/Popup";
import { useDialogContext } from "../context/Provider";

interface Props {
  menu: MenuModel;
  onClose(): void;
}

export function MenuWrapper({ menu, onClose }: Props) {
  const [hidden, setHidden] = useState(false);
  const onSelect = useCallback((item: ActionMenuItemModel) => {
    const behavior = getBehavior(item.behavior);
    if (behavior === MenuBehaviorEnum.CLOSE_ON_SELECT) {
      onClose();
    }
    if (behavior === MenuBehaviorEnum.HIDE_ON_SELECT) {
      setHidden(true);
    }
    console.log("menu", item);
  }, [setHidden, onClose]);

  return !hidden && <Menu Elem={Popup} uid={menu.uid} items={menu.items} maxRows={menu.maxRows} style={menu.style} layout={menu.layout} onSelect={onSelect} />;
}
