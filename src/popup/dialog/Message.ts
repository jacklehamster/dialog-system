import { PopAction } from "../actions/PopAction";

export interface MessageModel {
  text?: string;
  action?: PopAction | (PopAction | undefined)[];
}

export type Message = MessageModel | string;
