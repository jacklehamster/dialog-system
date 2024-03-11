import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { DialogData } from "./DialogData";
import { LockStatus, useControlsLock } from "../controls/useControlsLock";
import { UserInterface } from "../UserInterface";
import { Conversation } from "./Conversation";
import { useGameContext } from "../context/Provider";

interface Props {
  dialogData: DialogData;
  ui: UserInterface;
  onDone(): void;
}

interface Result {
  text?: string;
  disabled: boolean;
}

interface ReducerAction {
  popConversation?: boolean;
  nextMessage?: boolean;
  onDone?: () => void;
}

interface ReducerState {
  conversations: Conversation[];
  indices: number[];
  get conversation(): Conversation;
  get index(): number;
}

function reducer(state: ReducerState, action: ReducerAction) {
  const { conversations, indices } = state;
  if (action.nextMessage) {
    if (state.index >= state.conversation.messages.length.valueOf() - 1) {
      return {
        conversations: conversations.slice(0, conversations.length - 1),
        indices: indices.slice(0, indices.length - 1),
        get conversation() {
          return this.conversations[this.conversations.length - 1];
        },
        get index() {
          return this.indices[this.indices.length - 1];
        },
      };
    } else {
      return {
        conversations,
        indices: [...indices.slice(0, indices.length - 1), indices[indices.length - 1] + 1],
        get conversation() {
          return this.conversations[this.conversations.length - 1];
        },
        get index() {
          return this.indices[this.indices.length - 1];
        },
      }
    }
  } else if (action.popConversation) {
    return {
      conversations: conversations.slice(0, conversations.length - 1),
      indices: indices.slice(0, indices.length - 1),
      get conversation() {
        return this.conversations[this.conversations.length - 1];
      },
      get index() {
        return this.indices[this.indices.length - 1];
      },
    };
  }
  return state;
}

export function useDialog({ dialogData, ui, onDone }: Props): Result {
  const [state, dispatch] = useReducer(reducer, {
    conversations: [dialogData.conversation],
    indices: [0],
    get conversation() {
      return this.conversations[this.conversations.length - 1];
    },
    get index(): number {
      return this.indices[this.indices.length - 1];
    },
  });

  const nextMessage = useCallback(() => {
    dispatch({ nextMessage: true });
  }, [dispatch]);
  const { lockState } = useControlsLock({
    uid: dialogData.uid, listener: {
      onAction: () => {
        nextMessage();
      }
    }
  });

  useEffect(() => {
    ui.nextMessage = nextMessage;
    return () => {
      ui.nextMessage = () => { };
    };
  }, [nextMessage, ui]);

  const messages = useMemo(() => state.conversation?.messages, [state]);
  const message = useMemo(() => messages?.at(state.index), [messages, state]);
  const { closePopup } = useGameContext();

  useEffect(() => {
    if (!state.conversation) {
      closePopup(dialogData.uid);
      onDone();
    }
  }, [state, onDone, dialogData, closePopup]);

  useEffect(() => {
    if (message?.action) {
      const actions = Array.isArray(message.action) ? message.action : [message.action];
      ui.performActions(actions, {}).then(() => nextMessage());
    }
  }, [message, ui, dialogData, nextMessage]);

  return {
    text: message?.text,
    disabled: lockState === LockStatus.LOCKED,
  };
}
