import { List } from "abstract-list";
import { PopupData } from "../base/PopupData";
import { Message } from "./Message";

export interface DialogData extends PopupData {
  type?: "dialog",
  messages: List<Message> | Message[];
  onClose?: () => void;
}
