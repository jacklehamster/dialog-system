import { UserInterface } from '../UserInterface';
import { PopupListener } from './PopupListener';
import { DialogData } from '../dialog/DialogData';
import { MenuData } from '../menu/MenuData';
import { PopAction } from '../actions/PopAction';
import { PopState } from '../actions/PopState';

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

  async openDialog(_dialog: DialogData): Promise<void> {
  }
  async openMenu(_menu: MenuData): Promise<void> {
  }
  closePopup(): void {
  }
  nextMessage(): void {
  }
  async performActions(_actions: (PopAction | undefined)[], state: PopState): Promise<PopState> {
    return {};
  }
}
