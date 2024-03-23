import { useMemo } from "react";
import { Model } from "../model/Model";
import { UserInterface } from "../ui/UserInterface";
import { Dialog } from "./Dialog";

export interface Props {
  ui: UserInterface;
  registry: Record<string, (data: Model, ui: UserInterface, onDone: () => void) => JSX.Element>;
}

export function DialogManager({ ui, registry }: Props) {
  
  return <Dialog ui={ui} dialog={useMemo(() => ({
    messages: ["a", "b", "c"],
  }), [])} />;
}
