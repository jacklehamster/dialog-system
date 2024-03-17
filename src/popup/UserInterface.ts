import { MenuData } from "./menu/MenuData";
import { DialogData } from "./dialog/DialogData";
import { PopupListener } from "./base/PopupListener";
import { PopAction, PopActionResult } from "./actions/PopAction";
import { PopState } from "./actions/PopState";
import { ElemData } from "./base/usePopups";
import { LayoutModel } from "./base/Layout";

export interface UserInterface {
  performActions(actions: PopAction | (PopAction | undefined)[], state: PopState, onCallback: (state: PopState) => void): PopActionResult;
  openMenu(menu: MenuData): Promise<PopActionResult>;
  openDialog(dialog: DialogData): Promise<PopActionResult>;
  closePopup(): void;
  nextMessage(idx?: number): void;
  previousMessage(idx?: number): void;
  addDialogListener(listener: PopupListener): void;
  removeDialogListener(listener: PopupListener): void;
  getPopups(): ElemData[];
  setPopupData(index: number, data: ElemData): void;
  registerLayout(layout: LayoutModel | LayoutModel[]): void;
}
