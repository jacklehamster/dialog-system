import { Dialog } from "../dialog/Dialog";
import { MenuWrapper } from "../wrapper/MenuWrapper";
import { DialogModel } from "../model/DialogModel";
import { MenuModel } from "../menu/model/MenuModel";
import { RegistryCall } from "./RegistryCall";

export const DEFAULT_REGISTRY: Record<string, RegistryCall> = {
  dialog:  (data, onClose) => <Dialog key={data.uid} dialog={data as DialogModel} onClose={onClose} />,
  menu: (data, onClose) => <MenuWrapper key={data.uid} menu={data as MenuModel} onClose={onClose} />,
};
