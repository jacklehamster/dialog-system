import { PopActionConvertor } from "../actions/PopActionConvertor";
import { LayoutModel } from "../model/Layout";
import { PopActionFunction } from "../model/PopAction";

export interface LayoutRegistryModel {
  layout: LayoutModel | LayoutModel[];
}

export class LayoutRegistryConvertor implements PopActionConvertor<LayoutRegistryModel> {
  convert(model: LayoutRegistryModel): PopActionFunction {
    return (ui) => ui.registerLayout(model.layout);
  }
}
