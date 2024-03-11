import { useCallback, useLayoutEffect, useState } from "react";
import { useGameContext } from "../context/Provider";
import { Layout } from "./Layout";

interface Props {
  layout: Layout;
  disabled: boolean | undefined;
}

export function useUniquePopupOnLayout({ layout, disabled }: Props) {
  const [visible, setVisible] = useState(true);
  const { layoutReplacementCallbacks } = useGameContext();
  const hide = useCallback(() => setVisible(false), [setVisible]);
  useLayoutEffect(() => {
    const layoutUid = layout.uid;
    if (layoutUid && !disabled) {
      layoutReplacementCallbacks[layoutUid]?.();
      layoutReplacementCallbacks[layoutUid] = hide;
      setVisible(true);
    }
  }, [disabled, hide, layout, layoutReplacementCallbacks]);

  return { visible };
}
