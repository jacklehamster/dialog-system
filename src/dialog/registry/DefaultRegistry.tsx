import { Dialog } from "../dialog/Dialog";
import { Menu } from "../menu/Menu";
import { DialogModel } from "../model/DialogModel";
import { MenuModel } from "../model/MenuModel";
import { RegistryCall } from "./RegistryCall";

export const DEFAULT_REGISTRY: Record<string, RegistryCall> = {
  dialog:  (data, ui) => <Dialog key={data.uid} dialog={data as DialogModel} ui={ui} />,
  menu: (data, ui) => <Menu key={data.uid} menuData={data as MenuModel} ui={ui} />,
};
