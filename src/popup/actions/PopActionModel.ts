import { InsertConversationModel } from "./InsertConversationAction";
import { OpenDialogModel } from "./OpenDialogAction";
import { OpenMenuModel } from "./OpenMenuAction";

export type PopActionModel = Partial<InsertConversationModel> & Partial<OpenDialogModel> & Partial<OpenMenuModel>;
