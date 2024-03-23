import { State } from "../state/State";
import { PopAction } from "./PopAction";

export interface ActionScriptModel extends State {
  actions: PopAction[];
}

export type ActionScript = PopAction | PopAction[] | ActionScriptModel;
