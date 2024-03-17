import { useCallback, useEffect, useMemo, useReducer } from "react";
import { UserInterface } from "../UserInterface";
import { PopAction, PopActionFunction, PopActionResultEnum } from "./PopAction";
import { PopState } from "./PopState";
import { ConversionRegistry } from "./ConversionRegistry";

interface Props {
  ui: UserInterface;
}

interface ActionExecutor {
  actions: PopActionFunction[];
  index: number;
  popState: PopState;
}

interface ActionAction {
  actions?: PopActionFunction[];
  index?: number;
  next?: boolean;
  popState?: PopState;
}

function reducer(state: ActionExecutor, action: ActionAction): ActionExecutor {
  const index = action.index ?? (action.next ? state.index + 1 : state.index);
  const actions = action.actions ?? state.actions;
  const popState = action.popState ?? state.popState;
  return {
    actions,
    index,
    popState,
  };
}

export function useActions({ ui }: Props) {
  const registry = useMemo(() => new ConversionRegistry(), []);
  const [state, dispatch] = useReducer(reducer, {
    actions: [],
    index: 0,
    popState: {},
  });

  const performActions = useCallback((oneOrMoreActions: PopAction | (PopAction | undefined)[], popState: PopState, onDone: (state: PopState) => void): void => {
    const actions = (Array.isArray(oneOrMoreActions) ? oneOrMoreActions : [oneOrMoreActions])
      .filter((a): a is PopAction => !!a);
    const actionModels: PopActionFunction[] = [];
    actions.forEach(popAction => {
      if (typeof (popAction) === "function") {
        actionModels.push(popAction);
      } else {
        actionModels.push(...registry.convert(popAction));
      }
    });
    dispatch({ actions: actionModels, index: 0, popState });
  }, [dispatch, registry]);

  const executeAction = useCallback(async () => {
    if (state.index < state.actions.length) {
      const action = state.actions[state.index];
      const result = await action(ui, state.popState);
      console.log(action, result);
      return result !== PopActionResultEnum.WAIT_RESPONSE;
    }
    return false;
  }, [state, ui]);

  useEffect(() => {
    executeAction().then((next) => {
      if (next) {
        dispatch({ next })
      }
    });
  }, [dispatch, executeAction]);

  useEffect(() => {
    if (state.index >= state.actions.length) {
      console.log("DONE ACTIONS");
    }
  }, [state]);

  return { performActions };
}
