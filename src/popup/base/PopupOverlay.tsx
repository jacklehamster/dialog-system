import { useCallback, useEffect, useMemo, useState } from 'react';
import { Provider } from '../context/Provider';
import { PopupManager } from './PopupManager';
import { GameContextType } from '../context/GameContextType';
import { usePopupManager } from './usePopupManager';
import { PopupContainer } from './PopupContainer';
import { v4 as uuidv4 } from 'uuid';
import { PopupControl } from '../controls/PopupControl';
import ReactDOM from 'react-dom/client';
import { UserInterface } from '../UserInterface';

interface Props {
  popupManager: PopupManager;
  popupControl: PopupControl;
}

export function PopupOverlay({ popupManager, popupControl }: Props) {
  const { popups, addPopup, closePopup, topPopupUid } = usePopupManager();
  const [selection, setSelection] = useState(0);
  const [, setOnDones] = useState<(() => void)[]>([]);

  const gameContext: GameContextType = useMemo<GameContextType>(
    () => ({
      addControlsLock: (uid) => popupManager.addControlsLock(uid),
      removeControlsLock: (uid) => popupManager.removeControlsLock(uid),
      openMenu: (data) => {
        const type = 'menu';
        const uid = type + '-' + uuidv4();
        addPopup({ uid, type, ...data });
      },
      openDialog: (data) => {
        const type = 'dialog';
        const uid = type + '-' + uuidv4();
        addPopup({ uid, type, ...data });
      },
      closePopup,
      popupControl,
      topPopupUid,
      onSelection: setSelection,
    }),
    [
      popupManager,
      popupControl,
      addPopup,
      closePopup,
      topPopupUid,
      setSelection,
    ],
  );

  useEffect(() => {
    popupManager.openMenu = async (data) => {
      gameContext.openMenu(data);
      return new Promise((resolve) =>
        setOnDones((onDones) => [...onDones, resolve]),
      );
    };
    popupManager.openDialog = async (data) => {
      gameContext.openDialog(data);
      return new Promise((resolve) =>
        setOnDones((onDones) => [...onDones, resolve]),
      );
    };
    popupManager.closePopup = gameContext.closePopup;
    popupManager.selection = selection;
  }, [popupManager, gameContext, selection]);

  const onDone = useCallback(() => {
    setOnDones((previousOnDones) => {
      const last = previousOnDones[previousOnDones.length - 1];
      last?.();
      return previousOnDones.slice(0, previousOnDones.length - 1);
    });
  }, [setOnDones]);


  return (
    <Provider context={gameContext}>
      <PopupContainer popups={popups} ui={popupManager} onDone={onDone} />
    </Provider>
  );
}

const STYLE: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  userSelect: "none",
};

export function attachPopup(root: HTMLElement, config: {
  disableTap?: boolean,
} = {}): {
  ui: UserInterface;
  popupControl: PopupControl;
  detach: () => void,
} {
  const { offsetLeft: left, offsetTop: top } = root;
  const rootElem = document.createElement('div');
  const reactRoot = ReactDOM.createRoot(rootElem);
  const popupManager = new PopupManager();
  const popupControl = new PopupControl();
  reactRoot.render(<div style={{ ...STYLE, top, left,
    pointerEvents: config.disableTap ? 'none': undefined,
  }}>
    <PopupOverlay
      popupManager={popupManager}
      popupControl={popupControl}
    />
  </div>);
  root.appendChild(rootElem);
  const detach = () => {
    reactRoot.unmount();
  };
  return { ui: popupManager, popupControl, detach };
}
