import { ActionScript } from "../model/ActionScript";

export interface UserInterface {
  performActions(actions: ActionScript): Promise<void>;
}
