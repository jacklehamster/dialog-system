import { OpenDialogModel } from "./OpenDialogAction";
import { OpenMenuModel } from "./OpenMenuAction";

export type PopActionModel = Partial<OpenDialogModel> & Partial<OpenMenuModel>;
