import { PopupControl } from '../controls/PopupControl';

export interface GameContextType {
  addControlsLock(uid: string): void;
  removeControlsLock(uid: string): void;
  closePopup(uid?: string): void;
  popupControl: PopupControl;
  topPopupUid: string;
  layoutReplacementCallbacks: Record<string, () => void>;
}

export const DEFAULT_GAME_CONTEXT: GameContextType = {
  addControlsLock(_uid: string): void {
    throw new Error('Function not implemented.');
  },
  removeControlsLock(_uid: string): void {
    throw new Error('Function not implemented.');
  },
  closePopup(_uid): void {
    throw new Error('Function not implemented.');
  },
  topPopupUid: '',
  popupControl: new PopupControl(),
  layoutReplacementCallbacks: {},
};
