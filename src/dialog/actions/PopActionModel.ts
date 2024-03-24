import { OpenDialogModel } from "../dialog/OpenDialogAction";
import { LayoutRegistryModel } from "../layout/LayoutRegistryModel";
import { OpenMenuModel } from "../wrapper/OpenMenuAction";

export type PopActionModel = Partial<OpenDialogModel> & Partial<OpenMenuModel> & Partial<LayoutRegistryModel>;
