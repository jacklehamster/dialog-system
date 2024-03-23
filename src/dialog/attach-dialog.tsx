import ReactDOM from 'react-dom/client';
import { DEFAULT_REGISTRY } from "./registry/DefaultRegistry";
import { DialogManager } from "./dialog/DialogManager";
import { UserInterface } from "./ui/UserInterface";
import { Model } from './model/Model';
import { PopupControl } from './controls/PopupControl';


interface AttachDialogResults {
  detach: () => void;
  ui: UserInterface;
  popupControl: PopupControl;
}

const STYLE: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  userSelect: "none",
};

export function attachDialog(
  root: HTMLElement,
  config: { disableTap?: boolean } = {},
  registry: Record<string, (data: Model, ui: UserInterface, onDone: () => void) => JSX.Element> = DEFAULT_REGISTRY): AttachDialogResults
{
  const { offsetLeft: left, offsetTop: top } = root;
  const rootElem = document.createElement('div');
  const reactRoot = ReactDOM.createRoot(rootElem);
  const style: React.CSSProperties = {
    ...STYLE, top, left,
    pointerEvents: config.disableTap ? 'none' : undefined,
  };
  const ui: UserInterface = {
    performActions() { console.log("PERFORM ACTION");},
  };
  const popupControl = new PopupControl();
  const dom = <div style={style}>
    <DialogManager ui={ui} registry={registry} popupControl={popupControl} />
  </div>;
  reactRoot.render(dom);
  root.appendChild(rootElem);
  return { ui, detach: () => reactRoot.unmount(), popupControl };
}
