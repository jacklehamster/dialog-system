import { useCallback } from "react";
import { UserInterface } from "../UserInterface";
import { PopAction } from "./PopAction";
import { PopState } from "./PopState";

interface Props {
  ui: UserInterface;
}

export function useActions({ ui }: Props) {
  const performActions = useCallback(async (actions: (PopAction | undefined)[], state: PopState) => {
    for (let i = 0; i < actions.length; i++) {
      await actions[i]?.(ui, state);
    }
    return state;
  }, [ui]);
  return { performActions };
}
