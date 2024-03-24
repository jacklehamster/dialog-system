import { PopActionModel } from "../actions/PopActionModel";

export enum PopActionBehavior {
  CONTINUE,
  PAUSE,
}

export type PopActionFunction = () => Promise<PopActionBehavior | void>;

export type PopAction = PopActionFunction | PopActionModel;
