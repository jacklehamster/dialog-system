import { useEffect, useState } from "react";
import { PopupControlListener } from "./PopupControlListener";
import { useDialogContext } from "../context/Provider";

export enum LockStatus {
  LOCKED,
  UNLOCKED,
}

interface Props {
  uid?: string;
  listener: PopupControlListener;
}

export function useControlsLock({ uid, listener }: Props) {
  const { popupControl } = useDialogContext();
  const [locked, setLocked] = useState(false);

  const lockState = popupControl.controlLock === uid ? LockStatus.UNLOCKED : LockStatus.LOCKED;

  useEffect((): (() => void) | void => {
    if (lockState) {
      setLocked(true);
      popupControl.addListener(listener);
      return () => {
        popupControl.removeListener(listener);
        setLocked(false);
      };
    }
  }, [listener, setLocked, popupControl, lockState]);

  useEffect(() => {
    if (uid && locked) {
      popupControl.setControlLock(uid);
      return () => popupControl.removeControlsLock(uid);
    }
  }, [popupControl, locked, uid]);

  return { lockState };
}
