import { MenuData } from "./menu/MenuData";
import { DialogData } from "./dialog/DialogData";
import { PopupListener } from "./base/PopupListener";
import { PopAction } from "./actions/PopAction";
import { PopState } from "./actions/PopState";

export interface UserInterface {
  performActions(actions: (PopAction | undefined)[], state: PopState): Promise<PopState>;
  openMenu(menu: MenuData): Promise<void>;
  openDialog(dialog: DialogData): Promise<void>;
  closePopup(uid?: string): void;
  nextMessage(): void;
  get selection(): number;
  addDialogListener(listener: PopupListener): void;
  removeDialogListener(listener: PopupListener): void;
}
