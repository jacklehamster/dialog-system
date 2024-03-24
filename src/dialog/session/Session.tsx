import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { PopAction } from "../model/PopAction";
import { ConversionRegistry } from "../actions/ConversionRegistry";
import { v4 as uuidv4 } from 'uuid';
import { Model } from "../model/Model";
import { PopupModel } from "../common/PopupModel";
import { DialogContextType } from "../context/DialogContext";
import { PopupControl } from "../controls/PopupControl";
import { Layout, LayoutModel } from "../common/layout/Layout";
import { Provider } from "../context/Provider";
import { DialogState } from "../common/DialogState";

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

  const layoutReplacementCallbacks = useMemo(() => ({}), []);
  const layoutModels = useMemo<Record<string, LayoutModel>>(() => ({
  }), []);
  const registerLayout = useCallback((layout: LayoutModel | LayoutModel[]) => {
    const layouts = Array.isArray(layout) ? layout : [layout];
    layouts.forEach(layout => {
      if (layout.name) {
        layoutModels[layout.name] = layout;
      }  
    });
  }, [layoutModels]);
  const getLayout = useCallback((layout: Layout) => {
    if (typeof layout === "string") {
      return layoutModels[layout];
    }
    if (layout.name) {
      layoutModels[layout.name] = layout;
    }
    return layout;
  }, [layoutModels]);

  const [controlsLock, setControlsLock] = useState<string>();
  
  const context: DialogContextType = useMemo(() => ({
    getLayout,
    layoutReplacementCallbacks,
    popupControl,
    controlsLock,
    setControlsLock,
    removeControlsLock(uid: string) {
      setControlsLock(oldUid => {
        return oldUid === uid ? undefined : oldUid;
      });
    },
  }), [layoutReplacementCallbacks, popupControl, getLayout, controlsLock, setControlsLock]);

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
 
  return <Provider context={context}>
    {popups}
  </Provider>;
}
