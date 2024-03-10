import { InsertConversationConvertor } from "./InsertConversationAction";
import { OpenDialogConvertor } from "./OpenDialogAction";
import { OpenMenuConvertor } from "./OpenMenuAction";
import { PopActionFunction } from "./PopAction";
import { PopActionModel } from "./PopActionModel";
import { PopActionConvertor } from "./PopActionConvertor";

export class ConversionRegistry implements PopActionConvertor<PopActionModel> {
  #insertConversationConvertor = new InsertConversationConvertor();
  #openDialogConvertor = new OpenDialogConvertor();
  #openMenuConvertor = new OpenMenuConvertor();

  convert(model: PopActionModel): PopActionFunction {
    const { insertConversation, dialog, menu } = model;
    if (insertConversation) {
      return this.#insertConversationConvertor.convert({ insertConversation });
    }
    if (dialog) {
      return this.#openDialogConvertor.convert({ dialog });
    }
    if (menu) {
      return this.#openMenuConvertor.convert({ menu });
    }
    return () => { };
  }
}
