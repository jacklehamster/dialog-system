import { UserInterface } from '../UserInterface';
import { PopupListener } from './PopupListener';
import { DialogData } from '../dialog/DialogData';
import { MenuData } from '../menu/MenuData';
import { PopAction } from '../actions/PopAction';
import { PopState } from '../actions/PopState';
import { ElemData } from './usePopups';
import { LayoutModel } from './Layout';
import { OnDoneOptions } from './PopupOverlay';

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

  dialog = {
    async open(_dialog: DialogData): Promise<OnDoneOptions> {
    }
  }

  menu = {
    async open(_menu: MenuData): Promise<OnDoneOptions> {
    }
  }

  closePopup(): void {
  }
  nextMessage(): void {
  }
  previousMessage(): void {
  }
  async performActions(_actions: (PopAction | undefined)[], _state: PopState, _onDone: (state: PopState) => void): Promise<void> {
  }
  #popups: ElemData[] = [];
  getPopups(): ElemData[] {
    return this.#popups;
  }
  setPopups(popups: ElemData[]) {
    return popups;
  }
  setPopupData(index: number, data: ElemData): void {
    this.#popups[index] = data;
  }
  registerLayout(_layout: LayoutModel | LayoutModel[]): void {
  }
}
