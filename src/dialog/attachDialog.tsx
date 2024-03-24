import ReactDOM from 'react-dom/client';
import { DEFAULT_REGISTRY } from "./registry/DefaultRegistry";
import { SessionManager } from "./session/SessionManager";
import { UserInterface } from "./ui/UserInterface";
import { Model } from './model/Model';
import { PopupControl } from './controls/PopupControl';
import { ActionExecutor } from './ui/ActionExecutor';


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
  registry: Record<string, (data: Model, onClose: () => void) => JSX.Element> = DEFAULT_REGISTRY): AttachDialogResults
{
  const { offsetLeft: left, offsetTop: top } = root;
  const rootElem = document.createElement('div');
  const reactRoot = ReactDOM.createRoot(rootElem);
  const style: React.CSSProperties = {
    ...STYLE, top, left,
    pointerEvents: config.disableTap ? 'none' : undefined,
  };
  const executor = new ActionExecutor();
  const popupControl = new PopupControl();
  const dom = <div style={style}>
    <SessionManager executor={executor} elemRegistry={registry} popupControl={popupControl} />
  </div>;
  reactRoot.render(dom);
  root.appendChild(rootElem);
  return { ui: executor, popupControl, detach: () => reactRoot.unmount() };
}
