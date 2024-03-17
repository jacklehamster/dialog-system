import { MenuData } from "../menu/MenuData";
import { PopActionFunction } from "./PopAction";
import { PopActionConvertor } from "./PopActionConvertor";

export interface OpenMenuModel {
  menu: MenuData;
}

export class OpenMenuConvertor implements PopActionConvertor<OpenMenuModel> {
  convert(model: OpenMenuModel): PopActionFunction[] {
    return [(ui) => ui.openMenu(model.menu)];
  }
}
