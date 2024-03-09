import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { DialogData } from "./DialogData";
import { LockStatus, useControlsLock } from "../controls/useControlsLock";
import { UserInterface } from "../UserInterface";
import { useActions } from "../actions/useActions";
import { Conversation } from "./Conversation";

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
  newConversation?: Conversation;
  popConversation?: boolean;
  nextMessage?: boolean;
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
  } else if (action.newConversation) {
    return {
      conversations: [...conversations, action.newConversation],
      indices: [
        ...indices.slice(indices.length - 1),
        indices[indices.length - 1] + 1,
        0,
      ],
      get conversation() {
        return this.conversations[this.conversations.length - 1];
      },
      get index() {
        return this.indices[this.indices.length - 1];
      },
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
  const { performActions } = useActions({ ui });
  const [state, dispatch] = useReducer(reducer, {
    conversations: [dialogData.conversation],
    indices: [0],
    get conversation() {
      return this.conversations[this.conversations.length - 1];
    },
    get index() {
      return this.indices[this.indices.length - 1];
    },
  });

  const nextMessage = useCallback(() => dispatch({ nextMessage: true }), [dispatch]);
  const addConversation = useCallback((newConversation: Conversation) => {
    dispatch({ newConversation })
  }, [dispatch]);
  const { lockState } = useControlsLock({ uid: dialogData.uid, listener: { onAction: nextMessage } });

  useEffect(() => {
    ui.nextMessage = nextMessage;
    ui.addConversation = addConversation;
    return () => {
      ui.nextMessage = () => { };
      ui.addConversation = () => { };
    };
  }, [nextMessage, addConversation, ui]);

  const messages = useMemo(() => state.conversation?.messages, [state]);
  const message = useMemo(() => messages?.at(state.index), [messages, state]);

  useEffect(() => {
    const numMessages = messages?.length.valueOf();
    if (state.index >= numMessages) {
      dispatch({ popConversation: true });
    }
  }, [messages, state, dispatch]);

  useEffect(() => {
    if (!state.conversation) {
      ui.closePopup(dialogData.uid);
      onDone();
    }
  }, [state, ui, onDone, dialogData]);

  useEffect(() => {
    if (message?.action) {
      const actions = Array.isArray(message.action) ? message.action : [message.action];
      performActions(actions, {}).then(nextMessage);
    }
  }, [message, performActions, dialogData, nextMessage]);

  return {
    text: message?.text,
    disabled: lockState === LockStatus.LOCKED,
  };
}
