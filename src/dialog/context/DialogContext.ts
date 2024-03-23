import { PopupControl } from "../controls/PopupControl";
import { Layout, LayoutModel } from "../model/Layout";

export interface DialogContextType {
  getLayout(layout: Layout): LayoutModel;
  layoutReplacementCallbacks: Record<string, () => void>;
  popupControl: PopupControl;
}

export const DEFAULT_GAME_CONTEXT: DialogContextType = {
  layoutReplacementCallbacks: {},
  getLayout(_layout) {
    return {};
  },
  popupControl: new PopupControl(),
};
