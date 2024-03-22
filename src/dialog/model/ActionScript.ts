import { PopAction } from "./PopAction";

export interface ActionScriptModel {
  actions: PopAction[];
  state?: {
    uid: string;
    index: number;
  };
}

export type ActionScript = PopAction | PopAction[] | ActionScriptModel;
