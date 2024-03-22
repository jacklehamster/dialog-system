import { OnDoneOptions } from "../base/PopupOverlay";
import { UserInterface } from "../UserInterface";
import { PopActionModel } from "./PopActionModel";
import { PopState } from "./PopState";

export type PopActionFunction = (ui: UserInterface, state: PopState) => OnDoneOptions | Promise<OnDoneOptions>;

export type PopAction = PopActionFunction | PopActionModel;
