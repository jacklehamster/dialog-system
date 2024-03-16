import { useCallback, useEffect, useMemo, useState } from 'react';
import { Provider } from '../context/Provider';
import { PopupManager } from './PopupManager';
import { GameContextType } from '../context/GameContextType';
import { ElemData, usePopups } from './usePopups';
import { PopupContainer } from './PopupContainer';
import { v4 as uuidv4 } from 'uuid';
import { PopupControl } from '../controls/PopupControl';
import ReactDOM from 'react-dom/client';
import { UserInterface } from '../UserInterface';
import { DEFAULT_REGISTRY } from './DefaultRegistry';
import { useActions } from '../actions/useActions';

interface Props {
  popupManager: PopupManager;
  popupControl: PopupControl;
  registry?: Record<string, (data: ElemData, ui: UserInterface, onDone: ()=> void) => JSX.Element>;  
}

export function PopupOverlay({ popupManager, popupControl, registry = DEFAULT_REGISTRY }: Props) {
  const { popups, addPopup, closePopup, topPopupUid } = usePopups();
  const [, setOnDones] = useState<(() => void)[]>([]);
  const layoutReplacementCallbacks = useMemo<Record<string, () => void>>(() => ({
  }), []);
  const [forcedTopPopupUid, setForcedTopPopupUid] = useState<string>();

  const gameContext: GameContextType = useMemo<GameContextType>(
    () => ({
      addControlsLock: (uid) => popupManager.addControlsLock(uid),
      removeControlsLock: (uid) => popupManager.removeControlsLock(uid),
      closePopup,
      popupControl,
      topPopupUid,
      layoutReplacementCallbacks,
      forcedTopPopupUid,
      setForcedTopPopupUid,
    }),
    [
      popupManager,
      popupControl,
      addPopup,
      closePopup,
      topPopupUid,
      layoutReplacementCallbacks,
      forcedTopPopupUid,
      setForcedTopPopupUid,
    ],
  );

  useEffect(() => {
    popupManager.openMenu = async (data) => {
      const type = 'menu';
      addPopup({ uid: `${type}-${uuidv4()}`, type, ...data });
      return new Promise((resolve) =>
        setOnDones((onDones) => [...onDones, resolve]),
      );
    };
  }, [popupManager, addPopup]);

  useEffect(() => {
    popupManager.openDialog = async (data) => {
      const type = 'dialog';
      addPopup({ uid: `${type}-${uuidv4()}`, type, ...data });
      return new Promise((resolve) =>
        setOnDones((onDones) => [...onDones, resolve]),
      );
    };
    popupManager.closePopup = gameContext.closePopup;
  }, [popupManager, addPopup]);

  const { performActions } = useActions({ ui: popupManager });

  useEffect(() => {
    popupManager.performActions = performActions;
  }, [popupManager, performActions]);

  useEffect(() => {
    popupManager.popups = popups;
  }, [popupManager, popups]);

  const onDone = useCallback(() => {
    setOnDones((previousOnDones) => {
      const last = previousOnDones[previousOnDones.length - 1];
      last?.();
      return previousOnDones.slice(0, previousOnDones.length - 1);
    });
  }, [setOnDones]);


  return (
    <Provider context={gameContext}>
      <PopupContainer registry={registry} popups={popups} ui={popupManager} onDone={onDone} />
    </Provider>
  );
}

const STYLE: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  userSelect: "none",
};

interface AttachPopupResults {
  ui: UserInterface;
  popupControl: PopupControl;
  detach: () => void;
}

export function attachPopup(
    root: HTMLElement,
    config: { disableTap?: boolean } = {},  
    registry?: Record<string, (data: ElemData, ui: UserInterface, onDone: ()=> void) => JSX.Element>): AttachPopupResults {
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
      registry={registry}
    />
  </div>);
  root.appendChild(rootElem);
  return { ui: popupManager, popupControl, detach: () => reactRoot.unmount() };
}
