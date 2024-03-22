import { PopActionFunction } from "../model/PopAction";

export interface PopActionConvertor<T> {
  convert(model: T): PopActionFunction;
}
