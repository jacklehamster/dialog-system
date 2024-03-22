import { Model } from "../model/Model";
import { UserInterface } from "../ui/UserInterface";

export type RegistryCall = (data: Model, ui: UserInterface, onDone: () => void) => JSX.Element;
