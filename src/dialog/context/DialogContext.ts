import { PopupControl } from "../controls/PopupControl";
import { Layout, LayoutModel } from "../common/layout/Layout";

export interface DialogContextType {
  getLayout(layout: Layout): LayoutModel;
  layoutReplacementCallbacks: Record<string, () => void>,
  popupControl: PopupControl;

  controlsLock?: string;
  setControlsLock(uid?: string): void;
  removeControlsLock(uid: string): void;
}

export const DEFAULT_GAME_CONTEXT: DialogContextType = {
  layoutReplacementCallbacks: {},
  getLayout(_layout) {
    return {};
  },
  popupControl: new PopupControl(),
  setControlsLock() { },
  removeControlsLock() { },
};
