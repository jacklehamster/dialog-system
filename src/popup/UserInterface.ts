import { MenuData } from "./menu/MenuData";
import { DialogData } from "./dialog/DialogData";
import { PopupListener } from "./base/PopupListener";

export interface UserInterface {
  openMenu(menu: MenuData): Promise<void>;
  openDialog(dialog: DialogData): Promise<void>;
  closePopup(uid?: string): void;
  nextMessage(): void;
  get selection(): number;
  addDialogListener(listener: PopupListener): void;
  removeDialogListener(listener: PopupListener): void;
}
