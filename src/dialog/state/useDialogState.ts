import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { State } from "./State";

interface Props {
  state: State;
}

export function useDialogState({ state }: Props) {
  const [index, setIndex] = useState(0);
  // useEffect(() => {
  //   if (!state.state) {
  //     const uid = `${uuidv4()}`;
  //     state.state = {
  //       uid,
  //       index: 0,
  //     };
  //   }
  // }, [state]);

  // useEffect(() => {
  //   if (state.state) {
  //     state.state.index = index;
  //   }
  // }, [index, state.state]);

  return {
    setIndex, index, next: useCallback(() => {
      setIndex(index => index + 1);
    }, [setIndex])
  };
}
