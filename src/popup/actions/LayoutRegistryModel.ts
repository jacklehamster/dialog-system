import { LayoutModel } from "../base/Layout";
import { PopActionFunction } from "./PopAction";
import { PopActionConvertor } from "./PopActionConvertor";

export interface LayoutRegistryModel {
  layout: LayoutModel | LayoutModel[];
}

export class LayoutRegistryConvertor implements PopActionConvertor<LayoutRegistryModel> {
  convert(model: LayoutRegistryModel): PopActionFunction {
    return (ui) => ui.registerLayout(model.layout);
  }
}
