import { Layout, LayoutModel } from "@/dialog/common/layout/Layout";
import { useCallback, useMemo } from "react";
import { LayoutContextType } from "./LayoutContext";

export function useInitLayoutContext() {
  const layoutReplacementCallbacks = useMemo(() => ({}), []);
  const layoutModels = useMemo<Record<string, LayoutModel>>(() => ({}), []);
  const registerLayout = useCallback((layout: LayoutModel | LayoutModel[]) => {
    const layouts = Array.isArray(layout) ? layout : [layout];
    layouts.forEach(layout => {
      if (layout.name) {
        layoutModels[layout.name] = layout;
      }
    });
  }, [layoutModels]);
  const getLayout = useCallback((layout: Layout) => {
    if (typeof layout === "string") {
      return layoutModels[layout];
    }
    if (layout.name) {
      layoutModels[layout.name] = layout;
    }
    return layout;
  }, [layoutModels]);

  const context: LayoutContextType = useMemo(() => ({
    getLayout,
    layoutReplacementCallbacks,
  }), [layoutReplacementCallbacks, getLayout]);

  return { context, registerLayout };
}
