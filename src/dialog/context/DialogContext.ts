import { Layout, LayoutModel } from "../model/Layout";

export interface DialogContextType {
  getLayout(layout: Layout): LayoutModel;
  layoutReplacementCallbacks: Record<string, () => void>,
}

export const DEFAULT_GAME_CONTEXT: DialogContextType = {
  layoutReplacementCallbacks: {},
  getLayout(_layout) {
    return {};
  },
};
