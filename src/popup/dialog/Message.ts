import { PopAction } from "../actions/PopAction";

export interface Message {
  text?: string;
  action?: PopAction | (PopAction | undefined)[];
}
