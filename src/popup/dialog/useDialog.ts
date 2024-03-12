import { useCallback, useEffect, useMemo, useState } from "react";
import { DialogData } from "./DialogData";
import { LockStatus, useControlsLock } from "../controls/useControlsLock";
import { UserInterface } from "../UserInterface";
import { useGameContext } from "../context/Provider";
import { useReplaceUiMethod } from "../base/useReplaceUiMethods";

interface Props {
  dialogData: DialogData;
  ui: UserInterface;
  onDone(): void;
}

interface Result {
  text?: string;
  disabled: boolean;
}

export function useDialog({ dialogData, ui, onDone }: Props): Result {
  const { lockState } = useControlsLock({
    uid: dialogData.uid, listener: {
      onAction: () => {
        nextMessage();
      }
    }
  });
  const disabled = lockState === LockStatus.LOCKED;

  const [index, setIndex] = useState(0);
  const nextMessage = useCallback((idx: number = 1) => {
    setIndex(index => index + idx);
  }, [setIndex]);
  const previousMessage = useCallback((idx: number = 1) => {
    setIndex(index => index - idx);
  }, [setIndex]);

  useReplaceUiMethod({ ui, methodName: "nextMessage", method: nextMessage });
  useReplaceUiMethod({ ui, methodName: "previousMessage", method: previousMessage });

  const messages = useMemo(() => dialogData.conversation?.messages, [dialogData]);
  const message = useMemo(() => messages?.at(index), [messages, index]);
  const { closePopup } = useGameContext();

  useEffect(() => {
    if (!message) {
      closePopup(dialogData.uid);
      onDone();
    }
  }, [dialogData, onDone, message, closePopup]);

  useEffect(() => {
    if (message?.action) {
      const actions = Array.isArray(message.action) ? message.action : [message.action];
      ui.performActions(actions, {}).then(state => {
        if (!state.stayOnMessage) {
          nextMessage();
        }
      });
    }
  }, [message, ui, dialogData, nextMessage]);

  return {
    text: message?.text,
    disabled,
  };
}
