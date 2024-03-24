import { Layout, LayoutModel } from "../../common/layout/Layout";

export interface LayoutContextType {
  getLayout(layout: Layout): LayoutModel;
  layoutReplacementCallbacks: Record<string, () => void>,
}

export const DEFAULT_GAME_CONTEXT: LayoutContextType = {
  layoutReplacementCallbacks: {},
  getLayout: () => ({}),
};
