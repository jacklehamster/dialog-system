import { PopActionModel } from "@/popup/actions/PopActionModel";
import { PopState } from "@/popup/actions/PopState";
import { OnDoneOptions } from "@/popup/base/PopupOverlay";
import { UserInterface } from "@/popup/UserInterface";

export type PopActionFunction = (ui: UserInterface, state: PopState) => OnDoneOptions | Promise<OnDoneOptions>;

export type PopAction = PopActionFunction | PopActionModel;
