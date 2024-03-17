import { UserInterface } from "../UserInterface";
import { PopActionModel } from "./PopActionModel";
import { PopState } from "./PopState";

export type PopActionFunction = (ui: UserInterface, state: PopState) => void | Promise<void>;

export type PopAction = PopActionFunction | PopActionModel;
