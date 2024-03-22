import { OpenDialogModel } from "../dialog/OpenDialogAction";
import { LayoutRegistryModel } from "../layout/LayoutRegistryModel";
import { OpenMenuModel } from "../menu/OpenMenuAction";

export type PopActionModel = Partial<OpenDialogModel> & Partial<OpenMenuModel> & Partial<LayoutRegistryModel>;
