import { Layout, Style } from "../base/PopupData";
import { Conversation } from "../dialog/Conversation";
import { DialogData } from "../dialog/DialogData";
import { MenuData } from "../menu/MenuData";
import { PopActionModel } from "./PopActionModel";

export type RegistryModel = DialogData | MenuData | Conversation | Layout | Style | PopActionModel;
