import { UserInterface } from "../UserInterface";
import { PopState } from "./PopState";

export type PopAction = (ui: UserInterface, state: PopState) => void | Promise<void>;
