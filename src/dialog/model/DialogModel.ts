import { Message } from "@/popup/dialog/Message";
import { List } from "abstract-list";
import { PopupModel } from "./PopupModel";

export interface DialogModel extends PopupModel {
  messages: List<Message>;
  state?: {
    uid: string;
    index: number;
  };
}
