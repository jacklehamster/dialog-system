import { OpenDialogConvertor } from "./OpenDialogAction";
import { OpenMenuConvertor } from "./OpenMenuAction";
import { PopActionFunction } from "./PopAction";
import { PopActionModel } from "./PopActionModel";
import { PopActionConvertor } from "./PopActionConvertor";

export class ConversionRegistry implements PopActionConvertor<PopActionModel> {
  #openDialogConvertor = new OpenDialogConvertor();
  #openMenuConvertor = new OpenMenuConvertor();

  convert(model: PopActionModel): PopActionFunction {
    const { dialog, menu } = model;
    if (dialog) {
      return this.#openDialogConvertor.convert({ dialog });
    }
    if (menu) {
      return this.#openMenuConvertor.convert({ menu });
    }
    return () => { };
  }
}
