import { Conversation } from "../dialog/Conversation";
import { PopActionFunction } from "./PopAction";
import { PopActionConvertor } from "./PopActionConvertor";

export interface InsertConversationModel {
  insertConversation: Conversation;
}

export class InsertConversationConvertor implements PopActionConvertor<InsertConversationModel> {
  convert(model: InsertConversationModel): PopActionFunction {
    return (ui) => ui.insertConversation(model.insertConversation);
  }
}
