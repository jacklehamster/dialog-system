import { UI } from "../actions/ConversionRegistry";
import { PopActionConvertor } from "../actions/PopActionConvertor";
import { MenuModel } from "../menu/model/MenuModel";
import { PopActionFunction } from "../model/PopAction";

export interface OpenMenuModel {
  menu: MenuModel;
}

export class OpenMenuConvertor implements PopActionConvertor<OpenMenuModel> {
  constructor(readonly ui: UI) {
  }

  convert(model: OpenMenuModel): PopActionFunction {
    return async () => this.ui.openMenu(model.menu);
  }
}
