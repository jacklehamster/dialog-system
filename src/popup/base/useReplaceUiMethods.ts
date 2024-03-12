import { useEffect } from "react";
import { UserInterface } from "../UserInterface";

export interface Props<F extends Function> {
  ui: UserInterface;
  methodName: keyof UserInterface;
  method: F;
}

export function useReplaceUiMethod<F extends Function>({ ui, methodName, method }: Props<F>) {
  useEffect(() => {
    const preMethod: any = ui[methodName];
    ui[methodName] = method as any;
    return () => {
      ui[methodName] = preMethod;
    };
  }, [method, ui, methodName]);
}
