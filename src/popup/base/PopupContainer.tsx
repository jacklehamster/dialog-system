import { useCallback, useEffect, useMemo, useState } from 'react';
import { ElemData } from './usePopups';
import { UserInterface } from '../UserInterface';
import { PopupData } from './PopupData';
import { Layout, LayoutModel } from './Layout';
import { useGameContext } from '../context/Provider';

interface Props {
  popups: ElemData[];
  ui: UserInterface;
  onDone(): void;
  registry: Record<string, (data: ElemData, ui: UserInterface, onDone: ()=> void) => JSX.Element>;
}

export function PopupContainer({ popups, ui, onDone, registry }: Props) {
  const [elemsMap, setElemsMap] = useState<Record<string, JSX.Element>>({});

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

  const { getLayout } = useGameContext();
  const getRect = useCallback(
    (layout: Layout = {}) => {
      console.log("layout", layout);
      const { positionFromRight, positionFromBottom, position, size } = getLayout(layout);
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
    [getLayout],
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
