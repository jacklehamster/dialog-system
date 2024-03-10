import { useCallback, useEffect, useMemo } from "react";
import { UserInterface } from "../UserInterface";
import { PopAction } from "./PopAction";
import { PopState } from "./PopState";
import { ConversionRegistry } from "./ConversionRegistry";

interface Props {
  ui: UserInterface;
}

export function useActions({ ui }: Props) {
  const registry = useMemo(() => new ConversionRegistry(), []);

  const performActions = useCallback(async (actions: (PopAction | undefined)[], state: PopState) => {
    for (const action of actions) {
      if (action) {
        const popActionFun = typeof (action) === "function" ? action : registry.convert(action);
        await popActionFun(ui, state);
      }
    }
    return state;
  }, [ui, registry]);

  useEffect(() => {
    ui.performActions = performActions;
  }, [ui, performActions]);

  return { performActions };
}
