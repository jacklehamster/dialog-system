import { PopActionModel } from "../actions/PopActionModel";
import { DialogState } from "../common/DialogState";
import { PopAction } from "./PopAction";

export interface ActionScriptModel extends DialogState, PopActionModel {
  actions: PopAction[];
}

export type ActionScript = PopAction | PopAction[];
