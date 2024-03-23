import { useCallback, useMemo } from "react";
import { Layout, LayoutModel } from "../model/Layout";

export function useLayoutRegistry() {

  const layoutModels = useMemo<Record<string, LayoutModel>>(() => ({
  }), []);
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
  return { registerLayout, getLayout };
}
