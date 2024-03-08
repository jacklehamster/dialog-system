import { UserInterface } from '../UserInterface';
import { PopupListener } from './PopupListener';
import { DialogData } from '../dialog/DialogData';
import { MenuData } from '../menu/MenuData';

export class PopupManager implements UserInterface {
  #popupUids: string[] = [];
  #listeners: Set<PopupListener> = new Set();

  addControlsLock(uid: string): void {
    this.#popupUids.push(uid);
    this.#listeners.forEach(listener => listener.onPopup(this.#popupUids.length));
  }

  removeControlsLock(uid: string): void {
    this.#popupUids = this.#popupUids.filter(id => id !== uid);
    this.#listeners.forEach(listener => listener.onPopup(this.#popupUids.length));
  }

  addDialogListener(listener: PopupListener) {
    this.#listeners.add(listener);
  }

  removeDialogListener(listener: PopupListener) {
    this.#listeners.delete(listener);
  }

  openDialog(_dialog: DialogData): Promise<void> {
    throw new Error("Not implemented");
  }
  openMenu(_menu: MenuData): Promise<void> {
    throw new Error("Not implemented");
  }
  closePopup(): void {
    throw new Error("Not implemented");
  }
  nextMessage(): void {
    throw new Error("Not implemented");
  }
  selection: number = 0;
}
