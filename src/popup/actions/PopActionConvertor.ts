import { PopActionFunction } from "./PopAction";

export interface PopActionConvertor<T> {
  convert(model: T): PopActionFunction;
}
