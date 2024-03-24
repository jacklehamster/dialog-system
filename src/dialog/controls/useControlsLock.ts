import { useEffect } from "react";
import { PopupControlListener } from "./PopupControlListener";
import { useControlContext } from "../context/controls/ControlContextProvider";

export enum LockStatus {
  UNLOCKED,
  LOCKED,
}

interface Props {
  uid?: string;
  listener: PopupControlListener;
  disabled?: boolean;
}

export function useControlsLock({ uid, listener }: Props) {
  const { popupControl, controlsLock, setControlsLock, removeControlsLock } = useControlContext();

  const lockState = controlsLock === uid ? LockStatus.UNLOCKED : LockStatus.LOCKED;

  useEffect((): (() => void) | void => {
    if (lockState === LockStatus.UNLOCKED) {
      popupControl.addListener(listener);
      return () => {
        popupControl.removeListener(listener);
      };
    }
  }, [listener, popupControl, lockState]);

  useEffect(() => {
    if (uid && lockState === LockStatus.LOCKED) {
      setControlsLock(uid);
    }
  }, [popupControl, lockState, uid, setControlsLock]);

  useEffect(() => {
    if (uid) {
      return () => removeControlsLock(uid);
    }
  }, [setControlsLock, uid]);
  return { lockState, popupControl };
}
