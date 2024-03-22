import { Model } from "../model/Model";
import { UserInterface } from "../ui/UserInterface";

export interface Props {
  ui: UserInterface;
  registry: Record<string, (data: Model, ui: UserInterface, onDone: () => void) => JSX.Element>;
}

export function DialogManager({ ui, registry }: Props) {
  
  return <></>;
}
