import { Model } from "../model/Model";

export type RegistryCall = (data: Model, onClose: () => void) => JSX.Element;
