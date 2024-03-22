import { PopActionConvertor } from "../actions/PopActionConvertor";
import { DialogModel } from "../model/DialogModel";
import { PopActionFunction } from "../model/PopAction";

export interface OpenDialogModel {
  dialog: DialogModel;
}

export class OpenDialogConvertor implements PopActionConvertor<OpenDialogModel> {
  convert(model: OpenDialogModel): PopActionFunction {
    return (ui) => ui.dialog.open(model.dialog);
  }
}
