import { UserInterface } from "../UserInterface";
import { PopActionModel } from "./PopActionModel";
import { PopState } from "./PopState";

export enum PopActionResultEnum {
  NEXT,
  WAIT_RESPONSE,
}

export type PopActionResult = void | PopActionResultEnum;

export type PopActionFunction = (ui: UserInterface, state: PopState) => Promise<PopActionResult> | PopActionResult;

export type PopAction = PopActionFunction | PopActionModel;
