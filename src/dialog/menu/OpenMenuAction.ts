import { PopActionConvertor } from "../actions/PopActionConvertor";
import { MenuModel } from "../model/MenuModel";
import { PopActionFunction } from "../model/PopAction";

export interface OpenMenuModel {
  menu: MenuModel;
}

export class OpenMenuConvertor implements PopActionConvertor<OpenMenuModel> {
  convert(model: OpenMenuModel): PopActionFunction {
    return (ui) => ui.menu.open(model.menu);
  }
}
