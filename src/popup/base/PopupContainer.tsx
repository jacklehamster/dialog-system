import { useCallback, useEffect, useMemo, useState } from 'react';
import { ElemData } from './usePopupManager';
import { Dialog } from '../dialog/Dialog';
import { Menu } from '../menu/Menu';
import { UserInterface } from '../UserInterface';
import { PopupData } from './PopupData';
import { DialogData } from '../dialog/DialogData';
import { MenuData } from '../menu/MenuData';

interface Props {
  popups: ElemData[];
  ui: UserInterface;
  onDone(): void;
}

export function PopupContainer({ popups, ui, onDone }: Props) {
  const [elemsMap, setElemsMap] = useState<Record<string, JSX.Element>>({});
  const registry: Record<string, (data: ElemData, ui: UserInterface, onDone: ()=> void) => JSX.Element> = useMemo(() => ({
      dialog:  (data, ui, onDone) => <Dialog key={data.uid} dialogData={data as DialogData} ui={ui} onDone={onDone} />,
      menu: (data, ui, onDone) => <Menu key={data.uid} menuData={data as MenuData} ui={ui} onDone={onDone} />,
  }), []);

  const createElement = useCallback<(data: ElemData) => JSX.Element>(
    (data) => {
      if (!data.type) {
        throw new Error(`Invalid data type: ${data.type}`);
      }
      return registry[data.type](data, ui, onDone);
    },
    [ui, onDone, registry],
  );

  useEffect(() => {
    setElemsMap((elemsMap) => {
      const newElemsMap: Record<string, JSX.Element> = {};
      popups.forEach((data) => {
        if (data.uid) {
          newElemsMap[data.uid] = elemsMap[data.uid] ?? createElement(data);
        }
      });
      return newElemsMap;
    });
  }, [popups, setElemsMap, createElement]);

  const getRect = useCallback(
    ({ positionFromRight, positionFromBottom, position, size }: PopupData["layout"] = {}) => {
      const x = positionFromRight
        ? position?.[0] ?? 0
        : Number.MAX_SAFE_INTEGER - (position?.[0] ?? 0);
      const y = positionFromBottom
        ? position?.[1] ?? 0
        : Number.MAX_SAFE_INTEGER - (position?.[1] ?? 0);
      const width = size?.[0] ?? Number.MAX_SAFE_INTEGER;
      const height = size?.[1] ?? Number.MAX_SAFE_INTEGER;
      return { x, y, width, height };
    },
    [],
  );

  const elements = useMemo<JSX.Element[]>(() => {
    const sortedPopups = [...popups];
    sortedPopups.sort((p1, p2) => {
      const r1 = getRect(p1.layout),
        r2 = getRect(p2.layout);
      return r2.y - r1.y;
    });
    return sortedPopups.map((data) => elemsMap[data.uid ?? '']);
  }, [elemsMap, popups, getRect]);

  return <>{elements}</>;
}
