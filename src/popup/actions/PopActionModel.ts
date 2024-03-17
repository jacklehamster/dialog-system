import { OpenDialogModel } from "./OpenDialogAction";
import { OpenMenuModel } from "./OpenMenuAction";
import { LayoutRegistryModel } from "./LayoutRegistryModel";

export type PopActionModel = Partial<OpenDialogModel> & Partial<OpenMenuModel> & Partial<LayoutRegistryModel>;
