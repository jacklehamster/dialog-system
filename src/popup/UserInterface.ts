import { MenuData } from "./menu/MenuData";
import { DialogData } from "./dialog/DialogData";
import { PopupListener } from "./base/PopupListener";
import { Conversation } from "./dialog/Conversation";

export interface UserInterface {
  openMenu(menu: MenuData): Promise<void>;
  openDialog(dialog: DialogData): Promise<void>;
  addConversation(conversation: Conversation): void;
  closePopup(uid?: string): void;
  nextMessage(): void;
  get selection(): number;
  addDialogListener(listener: PopupListener): void;
  removeDialogListener(listener: PopupListener): void;
}
