import { MenuData } from "./menu/MenuData";
import { DialogData } from "./dialog/DialogData";
import { PopupListener } from "./base/PopupListener";
import { PopAction } from "./actions/PopAction";
import { PopState } from "./actions/PopState";
import { ElemData } from "./base/usePopups";

export interface UserInterface {
  performActions(actions: PopAction | (PopAction | undefined)[], state: PopState, callback: (state: PopState) => void): void;
  openMenu(menu: MenuData): void;
  openDialog(dialog: DialogData): void;
  closePopup(): void;
  nextMessage(idx?: number): void;
  previousMessage(idx?: number): void;
  addDialogListener(listener: PopupListener): void;
  removeDialogListener(listener: PopupListener): void;
  getPopups(): ElemData[];
  setPopupData(index: number, data: ElemData): void;
}
