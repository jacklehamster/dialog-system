import { PopupControlListener } from "./PopupControlListener";

export class PopupControl implements PopupControlListener {
  #listeners = new Set<PopupControlListener>();

  onUp(): void {
    this.#listeners.forEach(l => l.onUp?.());
  }

  onDown(): void {
    this.#listeners.forEach(l => l.onDown?.());
  }

  onAction(): void {
    this.#listeners.forEach(l => l.onAction?.());
  }

  addListener(listener: PopupControlListener): void {
    this.#listeners.add(listener);
  }

  removeListener(listener: PopupControlListener): void {
    this.#listeners.delete(listener);
  }
}
