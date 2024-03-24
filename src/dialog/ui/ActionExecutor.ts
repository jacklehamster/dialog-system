import { ActionScript } from "../model/ActionScript";
import { PopAction } from "../model/PopAction";
import { UserInterface } from "./UserInterface";

export class ActionExecutor implements UserInterface {
  #callbacks = new Set<(actions: PopAction[]) => Promise<void>>;

  async performActions(actions: ActionScript): Promise<void> {
    const popActions = (Array.isArray(actions) ? actions : [actions])
      .filter((a): a is PopAction => !!a);
    for (const c of this.#callbacks) {
      await c(popActions);
    }
  }

  addCallback(callback: (actions: PopAction[]) => Promise<void>): void {
    this.#callbacks.add(callback);
  }

  removeCallback(callback: (actions: PopAction[]) => Promise<void>): void {
    this.#callbacks.delete(callback);
  }
}
