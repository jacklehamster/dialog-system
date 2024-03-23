import { Message } from "@/popup/dialog/Message";
import { List } from "abstract-list";
import { PopupModel } from "./PopupModel";
import { State } from "../state/State";

export interface DialogModel extends PopupModel, State {
  messages: List<Message>;
}
