import { useCallback, useEffect, useMemo, useReducer } from "react";
import { PopAction } from "./PopAction";
import { PopState } from "./PopState";
import { ConversionRegistry } from "./ConversionRegistry";
import { UserInterface } from "../UserInterface";

interface ReducerAction {
  newActions?: PopAction[];
  callback?(state: PopState): void;
  next?: boolean;
}

interface Sequence {
  actions: PopAction[];
  popState: PopState;
  index: number;
  onCallback?(state: PopState): void;
}

interface ReducerState {
  sequences: Sequence[];
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  console.log(action);
  if (action.newActions) {
    const result = {
      sequences: [...state.sequences, {
        actions: action.newActions,
        popState: {},
        index: 0,
        onCallback: action.callback,
      }]
    };
    return result;
  }
  if (action.next) {
    const subsequences = state.sequences.slice(0, state.sequences.length - 1);
    const sequence = state.sequences[state.sequences.length - 1];
    if (sequence) {
      const { actions, popState, index, onCallback } = state.sequences[state.sequences.length - 1];
      const newIndex = index + 1;
      console.log(newIndex, "out", sequence.actions.length);
      if (newIndex >= sequence.actions.length - 1) {
        return {
          sequences: subsequences,
        };
      } else {
        return {
          sequences: [...subsequences, {
            actions, popState, index: newIndex, onCallback,
          }],
        };
      }
    }
  }

  return state;
}

interface Props {
  ui: UserInterface;
}

export function useActionsStack({ ui }: Props) {
  const [state, dispatch] = useReducer(reducer, { sequences: [] });
  const addActions = useCallback((actions: PopAction[], callback: (state: PopState) => void) => {
    dispatch({
      newActions: actions,
      callback,
    });
  }, [dispatch]);

  const nextAction = useCallback(() => {
    dispatch({ next: true });
  }, [dispatch]);

  const sequence = useMemo(() => {
    return state.sequences[state.sequences.length - 1];
  }, [state]);

  const registry = useMemo(() => new ConversionRegistry(), []);
  const executeAction = useCallback(async () => {
    if (sequence) {
      const { actions, index, popState } = sequence;
      const action = actions[index];
      if (action) {
        const popActionFun = typeof (action) === "function" ? action : registry.convert(action);
        await popActionFun(ui, popState);
        nextAction();
      }
    }
  }, [registry, sequence, ui, nextAction]);

  const action = useMemo(() => {
    return sequence?.actions[sequence?.index];
  }, [sequence]);

  useEffect(() => {
    if (action) {
      executeAction();
    }
  }, [executeAction, action]);

  return {
    addActions,
    executeAction,
  }
}
