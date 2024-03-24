import ReactDOM from 'react-dom/client';
import { Props, Menu } from './Menu';
import { PopupControl } from '../controls/PopupControl';

export function attachMenu(root: HTMLElement, props: Props) {
  const rootElem = document.createElement('div');
  const reactRoot = ReactDOM.createRoot(rootElem);
  const popupControl = new PopupControl();

  const dom = <Menu {...props}  />;
  reactRoot.render(dom);
  root.appendChild(rootElem); 
  return { popupControl, detach: () => reactRoot.unmount() };
}
