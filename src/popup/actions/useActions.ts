import { useCallback, useMemo } from "react";
import { UserInterface } from "../UserInterface";
import { PopAction } from "./PopAction";
import { PopState } from "./PopState";
import { ConversionRegistry } from "./ConversionRegistry";

interface Props {
  ui: UserInterface;
}

export function useActions({ ui }: Props) {
  const registry = useMemo(() => new ConversionRegistry(), []);

  const performActions = useCallback(async (oneOrMoreActions: PopAction | (PopAction | undefined)[], state: PopState = {}, onDone: (state: PopState) => void = () => { }) => {
    const actions = Array.isArray(oneOrMoreActions) ? oneOrMoreActions : [oneOrMoreActions];
    for (const action of actions) {
      if (action) {
        const popActionFun = typeof (action) === "function" ? action : registry.convert(action);
        await popActionFun(ui, state);
      }
    }
    onDone(state);
  }, [ui, registry]);

  return { performActions };
}
