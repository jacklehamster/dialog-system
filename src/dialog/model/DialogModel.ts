import { Message } from "@/popup/dialog/Message";
import { List } from "abstract-list";
import { PopupModel } from "../common/PopupModel";
import { DialogState } from "../common/DialogState";

export interface DialogModel extends PopupModel, DialogState {
  messages: List<Message>;
}
