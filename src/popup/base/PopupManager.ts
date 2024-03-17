import { UserInterface } from '../UserInterface';
import { PopupListener } from './PopupListener';
import { DialogData } from '../dialog/DialogData';
import { MenuData } from '../menu/MenuData';
import { PopAction } from '../actions/PopAction';
import { PopState } from '../actions/PopState';
import { ElemData } from './usePopups';
import { LayoutModel } from './Layout';

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

  async openDialog(_dialog: DialogData): Promise<void> {
  }
  async openMenu(_menu: MenuData): Promise<void> {
  }
  closePopup(): void {
  }
  nextMessage(): void {
  }
  previousMessage(): void {
  }
  async performActions(_actions: (PopAction | undefined)[], state: PopState): Promise<PopState> {
    return {};
  }
  popups: ElemData[] = [];
  getPopups(): ElemData[] {
    return this.popups;
  }
  setPopupData(index: number, data: ElemData): void {
    this.popups[index] = data;
  }
  registerLayout(_layout: LayoutModel | LayoutModel[]): void {
  }
}
