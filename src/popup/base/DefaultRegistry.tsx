import { UserInterface } from "../UserInterface";
import { Dialog } from "../dialog/Dialog";
import { DialogData } from "../dialog/DialogData";
import { Menu } from "../menu/Menu";
import { MenuData } from "../menu/MenuData";
import { ElemData } from "./usePopupManager";

export const DEFAULT_REGISTRY: Record<string, (data: ElemData, ui: UserInterface, onDone: ()=> void) => JSX.Element> = {
  dialog:  (data, ui, onDone) => <Dialog key={data.uid} dialogData={data as DialogData} ui={ui} onDone={onDone} />,
  menu: (data, ui, onDone) => <Menu key={data.uid} menuData={data as MenuData} ui={ui} onDone={onDone} />,
};
