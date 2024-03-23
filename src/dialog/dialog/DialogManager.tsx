import { useCallback, useMemo } from "react";
import { DialogContextType } from "../context/DialogContext";
import { Provider } from "../context/Provider";
import { Model } from "../model/Model";
import { UserInterface } from "../ui/UserInterface";
import { Dialog } from "./Dialog";
import { PopupControl } from "../controls/PopupControl";
import { Layout, LayoutModel } from "../model/Layout";
import { useLayoutRegistry } from "../layout/useLayoutRegistry";

export interface Props {
  ui: UserInterface;
  popupControl: PopupControl;
  registry: Record<string, (data: Model, ui: UserInterface, onDone: () => void) => JSX.Element>;
}

export function DialogManager({ ui, popupControl, registry }: Props) {
  const { getLayout } = useLayoutRegistry();

  // const context: DialogContextType = useMemo<DialogContextType>(
  //   () => ({
  //     getLayout,
  //     layoutReplacementCallbacks: {},
  //     popupControl,
  //   }), [
  //     popupControl, getLayout,
  //   ],
  // );

  return //<Provider context={context}>
    <Dialog ui={ui} dialog={{
        messages: useMemo(() => ["test", "test2", "test3"], [])
      }}></Dialog>;
  //</Provider>;
}
