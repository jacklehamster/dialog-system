// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import React, { CSSProperties, useEffect, useState } from 'react';
import './css/Popup.css';
import { Layout } from '../model/Layout';
import { usePopupLayout } from '../layout/usePopupLayout';
import { useUniquePopupOnLayout } from '../layout/useUniquePopupOnLayout';

interface Props {
  popUid?: string;
  children: React.ReactNode;
  layout: Layout;
  fontSize: number | undefined;
  disabled?: boolean;
  hidden?: boolean;
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
  transition: 'outline-color .3s',
};

const DOUBLE_BORDER_CSS: CSSProperties = {
  border: '3px solid white',
  borderRadius: 10,
  outline: '3px solid black',
  color: 'white',
  padding: 10,
  cursor: 'pointer',
  transition: 'border-color .3s',
};

const DOUBLE_BORDER_HEIGHT_OFFSET = 27;
const DEFAULT_FONT_SIZE = 24;

export function Popup({
  children,
  layout,
  fontSize,
  disabled,
  hidden,
}: Props) {
  const [h, setH] = useState(0);
  useEffect(() => {
    requestAnimationFrame(() => setH(hidden ? 10 : 100));
  }, [setH, hidden]);

  const { top, left, right, bottom, width, height } = usePopupLayout({
    layout,
  });

  const { visible } = useUniquePopupOnLayout({ layout, disabled });


  return !hidden && (
    <div
      style={{
        position: 'absolute',
        left, top, right, bottom, width, height,
        fontSize: fontSize ?? DEFAULT_FONT_SIZE,
        display: !visible ? "none": "",
      }}
    >
      <div
      className="pop-up"
      style={{
          ...POPUP_CSS,
          width: '100%',
          height: `${h}%`,
          overflow: 'hidden',
          transition: 'height .2s',
          outlineColor: disabled ? "whitesmoke" : "white",
        }}
      >
        <div
          className="double-border"
          style={{
            ...DOUBLE_BORDER_CSS,
            height: `calc(100% - ${DOUBLE_BORDER_HEIGHT_OFFSET}px)`,
            pointerEvents: disabled ? 'none' : undefined,
            borderColor: disabled ? "silver" : "white",
            color: disabled ? "whitesmoke" : "white",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
