import { useCallback, useMemo, useState } from "react";
import { DialogData } from "../dialog/DialogData";
import { MenuData } from "../menu/MenuData";

export type ElemData = DialogData | MenuData;

export function usePopups() {
  const [popups, setPopups] = useState<ElemData[]>([]);

  return {
    popups,
    addPopup: useCallback(
      (data: ElemData) => setPopups((popups) => ([...popups, data])),
      [setPopups],
    ),
    closePopup: useCallback(
      (uid?: string) => {
        setPopups((popups) => {
          if (!uid || uid === popups[popups.length - 1].uid) {
            return popups.slice(0, popups.length - 1);
          }
          return popups;
        });
      },
      [setPopups],
    ),
    topPopupUid: useMemo(
      () => popups[popups.length - 1]?.uid ?? '',
      [popups],
    ),
  }
}
