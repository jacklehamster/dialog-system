import { PopActionModel } from "./PopActionModel";
import { PopActionConvertor } from "./PopActionConvertor";
import { OpenDialogConvertor } from "../dialog/OpenDialogAction";
import { OpenMenuConvertor } from "../wrapper/OpenMenuAction";
import { LayoutRegistryConvertor } from "../layout/LayoutRegistryModel";
import { PopActionFunction } from "../model/PopAction";
import { PopupModel } from "../common/PopupModel";
import { LayoutModel } from "../common/layout/Layout";

export interface UI {
  openDialog(model: PopupModel): void;
  openMenu(model: PopupModel): void;
  registerLayout(layout: LayoutModel): void;
}

export class ConversionRegistry implements PopActionConvertor<PopActionModel> {
  #openDialogConvertor;
  #openMenuConvertor;
  #layoutConvertor;

  constructor(ui: UI) {
    this.#openDialogConvertor = new OpenDialogConvertor(ui);
    this.#openMenuConvertor = new OpenMenuConvertor(ui);
    this.#layoutConvertor = new LayoutRegistryConvertor(ui);
  }

  convert(model: PopActionModel): PopActionFunction {
    const { dialog, menu, layout } = model;
    const callbacks: PopActionFunction[] = [];
    if (layout) {
      callbacks.push(this.#layoutConvertor.convert({ layout }));
    }
    if (dialog) {
      callbacks.push(this.#openDialogConvertor.convert({ dialog }));
    }
    if (menu) {
      callbacks.push(this.#openMenuConvertor.convert({ menu }));
    }
    return callbacks.length <= 1 ? callbacks[0] : async () => {
      for (const callback of callbacks) {
        await callback();
      }
    };
  }
}
