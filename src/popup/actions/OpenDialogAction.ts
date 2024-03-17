import { DialogData } from "../dialog/DialogData";
import { PopActionFunction } from "./PopAction";
import { PopActionConvertor } from "./PopActionConvertor";

export interface OpenDialogModel {
  dialog: DialogData;
}

export class OpenDialogConvertor implements PopActionConvertor<OpenDialogModel> {
  convert(model: OpenDialogModel): PopActionFunction[] {
    return [(ui) => ui.openDialog(model.dialog)];
  }
}
