import { PopAction } from "../model/PopAction";

export interface UserInterface {
  performActions(actions: PopAction | (PopAction | undefined)[]): void;
}
