import { UI } from "../actions/ConversionRegistry";
import { PopActionConvertor } from "../actions/PopActionConvertor";
import { LayoutModel } from "../common/layout/Layout";
import { PopActionFunction } from "../model/PopAction";

export interface LayoutRegistryModel {
  layout: LayoutModel | LayoutModel[];
}

export class LayoutRegistryConvertor implements PopActionConvertor<LayoutRegistryModel> {
  constructor(readonly ui: UI) {
  }

  convert(model: LayoutRegistryModel): PopActionFunction {
    return async () => {
      const layouts = Array.isArray(model.layout) ? model.layout : [model.layout];
      layouts.forEach(layout => {
        this.ui.registerLayout(layout);
      });
    };
  }
}
