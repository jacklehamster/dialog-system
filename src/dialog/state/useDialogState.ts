import { useCallback, useEffect, useState } from "react";
import { DialogState } from "../common/DialogState";
import { v4 as uuidv4 } from 'uuid';

export function useDialogState(state: DialogState) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!state.state) {
      state.state = {
        uid: uuidv4(),
        index: 0,
      };
    }
    state.state.index = index;
  }, [index, state]);

  return {
    index,
    setIndex,
    next: useCallback(() => setIndex(index => index + 1), [setIndex]),
  };
}
