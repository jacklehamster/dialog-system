import { MenuData } from "./menu/MenuData";
import { DialogData } from "./dialog/DialogData";
import { PopupListener } from "./base/PopupListener";
import { PopAction } from "./actions/PopAction";
import { PopState } from "./actions/PopState";
import { ElemData } from "./base/usePopups";
import { LayoutModel } from "./base/Layout";
import { OnDoneOptions } from "./base/PopupOverlay";

export interface UserInterface {
  performActions(actions: PopAction | (PopAction | undefined)[], state?: PopState, onDone?: (state: PopState) => void): void;
  menu: {
    open(menu: MenuData): Promise<OnDoneOptions>;
  };
  dialog: {
    open(dialog: DialogData): Promise<OnDoneOptions>;
  };
  closePopup(): void;
  nextMessage(idx?: number): void;
  previousMessage(idx?: number): void;
  addDialogListener(listener: PopupListener): void;
  removeDialogListener(listener: PopupListener): void;
  getPopups(): ElemData[];
  setPopupData(index: number, data: ElemData): void;
  registerLayout(layout: LayoutModel | LayoutModel[]): void;
}
