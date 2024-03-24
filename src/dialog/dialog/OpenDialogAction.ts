import { UI } from "../actions/ConversionRegistry";
import { PopActionConvertor } from "../actions/PopActionConvertor";
import { DialogModel } from "../model/DialogModel";
import { PopActionFunction } from "../model/PopAction";

export interface OpenDialogModel {
  dialog: DialogModel;
}

export class OpenDialogConvertor implements PopActionConvertor<OpenDialogModel> {
  constructor(readonly ui: UI) {
  }

  convert(model: OpenDialogModel): PopActionFunction {
    return async () => this.ui.openDialog(model.dialog);
  }
}
