import { ActionScript } from "./ActionScript";

export interface MessageModel {
  text?: string;
  actions?: ActionScript;
}

export type Message = MessageModel | string;
