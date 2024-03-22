import { useCallback, useEffect, useState } from "react";
import { Layout } from "../model/Layout";
import { useDialogContext } from "../context/Provider";

interface Props {
  layout: Layout;
  disabled: boolean | undefined;
}

export function useUniquePopupOnLayout({ layout, disabled }: Props) {
  const [visible, setVisible] = useState(true);
  const { layoutReplacementCallbacks } = useDialogContext();
  const hide = useCallback(() => setVisible(false), [setVisible]);
  useEffect(() => {
    const layoutName = typeof layout === "string" ? layout : layout.name;
    if (layoutName && !disabled) {
      layoutReplacementCallbacks[layoutName]?.();
      layoutReplacementCallbacks[layoutName] = hide;
      setVisible(true);
    }
  }, [disabled, hide, layout, layoutReplacementCallbacks]);

  return { visible };
}
