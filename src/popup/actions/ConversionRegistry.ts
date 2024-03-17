import { OpenDialogConvertor } from "./OpenDialogAction";
import { OpenMenuConvertor } from "./OpenMenuAction";
import { PopActionFunction } from "./PopAction";
import { PopActionModel } from "./PopActionModel";
import { PopActionConvertor } from "./PopActionConvertor";
import { LayoutRegistryConvertor } from "./LayoutRegistryModel";

export class ConversionRegistry implements PopActionConvertor<PopActionModel> {
  #openDialogConvertor = new OpenDialogConvertor();
  #openMenuConvertor = new OpenMenuConvertor();
  #layoutConvertor = new LayoutRegistryConvertor();

  convert(model: PopActionModel): PopActionFunction[] {
    const { dialog, menu, layout } = model;
    const callbacks: PopActionFunction[] = [];
    if (layout) {
      callbacks.push(...this.#layoutConvertor.convert({ layout }));
    }
    if (dialog) {
      callbacks.push(...this.#openDialogConvertor.convert({ dialog }));
    }
    if (menu) {
      callbacks.push(...this.#openMenuConvertor.convert({ menu }));
    }
    return callbacks;
  }
}
