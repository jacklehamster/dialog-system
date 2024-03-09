// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import React, { CSSProperties, useEffect, useState } from 'react';
import './css/Popup.css';
import { useGameContext } from '../context/Provider';

interface Props {
  children: React.ReactNode;
  position: [number, number];
  size: [number | undefined, number | undefined];
  positionFromRight?: boolean;
  positionFromBottom?: boolean;
  fontSize: number | undefined;
  disabled?: boolean;
}

//  Hack until I get proper CSS to work
const OVERLAP: CSSProperties = {
  position: 'absolute',
};

const POPUP_CSS: CSSProperties = {
  outline: '3px solid #fff',
  backgroundColor: 'black',
  borderRadius: 12,
  padding: 3,
  boxShadow: '10px 10px 0px #000000cc',
};

const DOUBLE_BORDER_CSS: CSSProperties = {
  border: '3px solid white',
  borderRadius: 10,
  outline: '3px solid black',
  color: 'white',
  padding: 10,
  cursor: 'pointer',
};

const DOUBLE_BORDER_HEIGHT_OFFSET = 27;
const DEFAULT_PADDING = 50;
const DEFAULT_FONT_SIZE = 24;

export function Popup({
  children,
  position: [x, y],
  size: [width, height],
  positionFromRight,
  positionFromBottom,
  fontSize,
  disabled,
}: Props) {
  const [h, setH] = useState(10);
  useEffect(() => {
    requestAnimationFrame(() => setH(100));
  }, [setH]);

  const { popupControl } = useGameContext();

  return (
    <div
      className="pop-up"
      style={{
        position: 'absolute',
        left: positionFromRight ? `calc(100% - ${x}px)` : x,
        top: positionFromBottom ? `calc(100% - ${y}px)` : y,
        right: DEFAULT_PADDING,
        bottom: DEFAULT_PADDING,
        width,
        height,
        fontSize: fontSize ?? DEFAULT_FONT_SIZE,
      }}
    >
      <div
        style={{
          ...POPUP_CSS,
          width: '100%',
          height: `${h}%`,
          overflow: 'hidden',
          transition: 'height .2s',
        }}
      >
        <div
          className="double-border"
          style={{
            ...DOUBLE_BORDER_CSS,
            height: `calc(100% - ${DOUBLE_BORDER_HEIGHT_OFFSET}px)`,
            pointerEvents: disabled ? 'none' : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
