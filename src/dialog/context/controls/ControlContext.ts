import { PopupControl } from "../../controls/PopupControl";

export interface ControlContextType {
  popupControl: PopupControl;
  controlsLock?: string;
  setControlsLock(uid?: string): void;
  removeControlsLock(uid: string): void;
}

export const DEFAULT_CONTROL_CONTEXT: ControlContextType = {
  popupControl: new PopupControl(),
  setControlsLock() { },
  removeControlsLock() { },
};
