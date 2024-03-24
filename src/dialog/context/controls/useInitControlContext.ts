import { useMemo, useState } from "react";
import { ControlContextType } from "./ControlContext";
import { PopupControl } from "../../controls/PopupControl";

interface Props {
  popupControl: PopupControl;
}

export function useInitControlContext({ popupControl }: Props) {
  const [controlsLock, setControlsLock] = useState<string>();

  const context: ControlContextType = useMemo(() => ({
    popupControl,
    controlsLock,
    setControlsLock,
    removeControlsLock(uid: string) {
      setControlsLock(oldUid => {
        return oldUid === uid ? undefined : oldUid;
      });
    },
  }), [popupControl, setControlsLock]);

  return context;
}
