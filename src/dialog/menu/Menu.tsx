import { List, map } from 'abstract-list';
import { useMenu } from './useMenu';
import { ElemProps } from '../common/ElemProps';
import { MenuItem } from '@/popup/menu/MenuItem';
import { Layout } from '../common/layout/Layout';
import { Style } from '../common/Style';
import { Popup } from '../common/popup/Popup';

export interface Props {
  Elem?(props: ElemProps): JSX.Element
  uid?: string;
  items?: List<MenuItem>;
  maxRows?: number;
  style?: Style;
  layout?: Layout;
  onSelect(item: MenuItem): void;
}

export function Menu({ Elem = Popup, uid, items = [], maxRows, style, layout, onSelect }: Props): JSX.Element {
  const { scroll, scrollUp, scrollDown, selectedItem, select, disabled, menuHoverEnabled, enableMenuHover, onMenuAction } = useMenu({ uid, items, maxRows, onSelect });

  return (
    <Elem
      uid={uid!}
      layout={layout ?? {}}
      style={style}
      disabled={disabled}
    >
      <svg xmlns="http://www.w3.org/2000/svg" style={{
          position: "absolute",
          height: 20,
          marginTop: -15,
          width: 200,
          display: scroll > 0 ? "" : "none",
          left: `calc(50% - 100px)`,
        }} onMouseDown={() => scrollUp()}>
        <polygon points="100,10 110,20 90,20" style={{ fill: "white" }}/>
      </svg>
      <div style={{ 
        paddingTop: 10,
        cursor: menuHoverEnabled ? "inherit" : "auto",
      }}>
        <div style={{ height: `calc(100% - 27px)`, overflow: "hidden" }}>
          <div style={{ marginTop: scroll * -31, transition: "margin-top .2s" }}>
            {map(items, (item, index) => {
              return (
                <div key={index} style={{
                    color: selectedItem === item ? 'black' : disabled ? 'whitesmoke' : 'white',
                    backgroundColor: selectedItem !== item ? 'black' : disabled ? 'whitesmoke' : 'white',
                  }}
                  onMouseMove={() => {
                    enableMenuHover();
                    select(index);
                  }}
                  onMouseOver={menuHoverEnabled ? () => select(index) : undefined}
                  onClick={menuHoverEnabled ? () => onMenuAction(index) : undefined}>
                  {typeof(item) === "string" ? item : item?.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" style={{
          position: "absolute",
          height: 20,
          width: 200,
          marginTop: -5,
          display: scroll + (maxRows ?? items.length.valueOf()) < items.length.valueOf() ? "" : "none",
          left: `calc(50% - 100px)`,
        }} onMouseDown={() => scrollDown()}>
        <polygon points="100,20 110,10 90,10" style={{ fill: "white" }}/>
      </svg>
    </Elem>
  );
}
