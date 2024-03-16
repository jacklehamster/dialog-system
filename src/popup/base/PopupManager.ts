import { UserInterface } from '../UserInterface';
import { PopupListener } from './PopupListener';
import { DialogData } from '../dialog/DialogData';
import { MenuData } from '../menu/MenuData';
import { PopAction } from '../actions/PopAction';
import { PopState } from '../actions/PopState';
import { ElemData } from './usePopups';

export class PopupManager implements UserInterface {
  #lockUids: string[] = [];
  #listeners: Set<PopupListener> = new Set();

  addControlsLock(uid: string): void {
    this.#lockUids.push(uid);
    this.#listeners.forEach(listener => listener.onPopup(this.#lockUids.length));
  }

  removeControlsLock(uid: string): void {
    this.#lockUids = this.#lockUids.filter(id => id !== uid);
    this.#listeners.forEach(listener => listener.onPopup(this.#lockUids.length));
  }

  addDialogListener(listener: PopupListener) {
    this.#listeners.add(listener);
  }

  removeDialogListener(listener: PopupListener) {
    this.#listeners.delete(listener);
  }

  openDialog(_dialog: DialogData): void {
  }
  openMenu(_menu: MenuData): void {
  }
  closePopup(): void {
  }
  nextMessage(): void {
  }
  previousMessage(): void {
  }
  performActions(_actions: (PopAction | undefined)[], state: PopState): void {
  }
  popups: ElemData[] = [];
  getPopups(): ElemData[] {
    return this.popups;
  }
  setPopupData(index: number, data: ElemData): void {
    this.popups[index] = data;
  }
}
