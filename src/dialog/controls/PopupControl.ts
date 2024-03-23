import { PopupControlListener } from "./PopupControlListener";

export class PopupControl implements PopupControlListener {
  #listeners = new Set<PopupControlListener>();

  setControlLock(uid?: string): void {
    this.controlLock = uid;
  }

  removeControlsLock(uid?: string): void {
    if (uid === this.controlLock) {
      this.controlLock = undefined;
    }
  }

  controlLock?: string;

  onUp(): void {
    for (const listener of this.#listeners) {
      listener.onUp?.();
    }
  }

  onDown(): void {
    for (const listener of this.#listeners) {
      listener.onDown?.();
    }
  }

  onAction(): void {
    for (const listener of this.#listeners) {
      listener.onAction?.();
    }
  }

  addListener(listener: PopupControlListener): void {
    this.#listeners.add(listener);
  }

  removeListener(listener: PopupControlListener): void {
    this.#listeners.delete(listener);
  }
}
