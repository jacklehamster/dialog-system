import { useEffect, useState } from "react";
import { Model } from "../model/Model";
import { PopupControl } from "../controls/PopupControl";
import { ActionExecutor } from "../ui/ActionExecutor";
import { Session } from "./Session";
import { PopAction } from "../model/PopAction";
import { ActionScript } from "../model/ActionScript";

export interface Props {
  executor: ActionExecutor;
  popupControl: PopupControl;
  elemRegistry: Record<string, (data: Model, onClose: () => void) => JSX.Element>;
}

export function SessionManager({ executor, elemRegistry, popupControl }: Props) {
  const [actions, setActions] = useState<PopAction[]>([]);
  useEffect(() => {
    const callback = async (actions: ActionScript) => {
      const actionArray = Array.isArray(actions)
        ? actions
        :[actions];
      setActions(actionArray);
    };
    executor.addCallback(callback);
    return () => executor.removeCallback(callback);
  }, [executor]);

  return <Session actions={actions} elemRegistry={elemRegistry} popupControl={popupControl} />;
}
