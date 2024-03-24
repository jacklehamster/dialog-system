import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { PopAction } from "../model/PopAction";
import { ConversionRegistry } from "../actions/ConversionRegistry";
import { v4 as uuidv4 } from 'uuid';
import { Model } from "../model/Model";
import { PopupModel } from "../common/PopupModel";
import { LayoutContextType } from "../context/layout/LayoutContext";
import { PopupControl } from "../controls/PopupControl";
import { Layout, LayoutModel } from "../common/layout/Layout";
import { LayoutContextProvider } from "../context/layout/LayoutContextProvider";
import { DialogState } from "../common/DialogState";
import { ControlContextProvider } from "../context/controls/ControlContextProvider";
import { useInitLayoutContext } from "../context/layout/useInitLayoutContext";

interface Props {
  actions: PopAction[];
  elemRegistry: Record<string, (data: Model, onClose: () => void) => JSX.Element>;
  popupControl: PopupControl;
}

interface ReducerAction {
  next?: true;
}

type ReducerCallback = (state: DialogState, action: ReducerAction) => DialogState;

export function Session({ actions, elemRegistry, popupControl } : Props) {
  const [popups, setPopups] = useState<JSX.Element[]>([]);
  const ensureData = useCallback((data: PopupModel) => {
    if (!data.uid) {
      data.uid = uuidv4();
    }
    return data;
  }, []);

  const closePopup = useCallback((uid?: string) => {
    setPopups(popups => popups.filter(p => p.key !== uid));
  }, [setPopups]);
  const openDialog = useCallback((data: PopupModel) => {
    setPopups(popups => {
      const d = ensureData(data);
      return [
        ...popups,
        elemRegistry.dialog?.(d, () => closePopup(d.uid)),
      ];
    });
  }, [setPopups, elemRegistry, ensureData, closePopup]);
  const openMenu = useCallback((data: PopupModel) => {
    setPopups(popups => {
      const d = ensureData(data);
      return [
        ...popups,
        elemRegistry.menu?.(d, () => closePopup(d.uid)),
      ];
    });
  }, [setPopups, elemRegistry, ensureData]);

  const { context : layoutContext, registerLayout } = useInitLayoutContext();

  const conversionRegistry = useMemo(() => new ConversionRegistry({
    openDialog,
    openMenu,
    registerLayout,
  }), [openDialog, openMenu, registerLayout]);

  const [state, dispatch] = useReducer<ReducerCallback>((state, action) => {
    return state;
  }, {
    state: {
      uid: uuidv4(),
      index: 0,
    },
  });

  const currentAction = useMemo(() => actions[state.state?.index ?? 0], [actions, state.state?.index]);

  useEffect(() => {
    if (currentAction) {
      const func = typeof(currentAction) === "function" ? currentAction : conversionRegistry.convert(currentAction);
      func();
    }
  }, [currentAction, conversionRegistry]);
 
  return <ControlContextProvider popupControl={popupControl}>
          <LayoutContextProvider context={layoutContext}>
            {popups}
          </LayoutContextProvider>
        </ControlContextProvider>;
}
