import { map } from 'abstract-list';
import { Popup } from '../base/Popup';
import { MenuData } from './MenuData';
import { UserInterface } from '../UserInterface';
import { useMenu } from './useMenu';
import { CSSProperties } from 'react';
import { useUniquePopupOnLayout } from '../base/useUniquePopupOnLayout';

interface Props {
  menuData: MenuData;
  ui: UserInterface;
  onDone(): void;
}

export function Menu({ menuData, ui, onDone }: Props): JSX.Element {
  const { scroll, scrollUp, scrollDown, selectedItem, select, disabled, menuHoverEnabled, enableMenuHover, hidden, onMenuAction } = useMenu({ menuData, ui, onDone });
  const layout = menuData?.layout ?? {};
  const { visible } = useUniquePopupOnLayout({ layout, disabled });

  return (
    <Popup
      popUid={menuData.uid!}
      layout={layout}
      fontSize={menuData.style?.fontSize}
      disabled={disabled}
      hidden={hidden}
      displayNone={!visible}
      onDone={onDone}
    >
      <svg xmlns="http://www.w3.org/2000/svg" style={{
          position: "absolute",
          height: 20,
          marginTop: -15,
          width: 200,
          display: scroll > 0 ? "" : "none",
          left: `calc(50% - 100px)`,
        }} onMouseDown={() => scrollUp()}>
        <polygon points="100,10 110,20 90,20" style={{
          fill: "white",
        }}/>
      </svg>
      <div style={{ 
        paddingTop: 10,
        cursor: menuHoverEnabled ? "inherit" : "auto",
      }}>
        <div style={{ height: `calc(100% - 27px)`, overflow: "hidden" }}>
          <div style={{ marginTop: scroll * -31, transition: "margin-top .2s" }}>
            {map(menuData.items, (item, index) => {
              const style: CSSProperties = {
                color: selectedItem === item ? 'black' : disabled ? 'whitesmoke' : 'white',
                backgroundColor: selectedItem !== item ? 'black' : disabled ? 'whitesmoke' : 'white',
              };
              return (
                <div key={index} style={style}
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
          display: scroll + (menuData.maxRows ?? menuData.items.length.valueOf()) < menuData.items.length.valueOf() ? "" : "none",
          left: `calc(50% - 100px)`,
        }} onMouseDown={() => scrollDown()}>
        <polygon points="100,20 110,10 90,10" style={{
          fill: "white",
        }}/>
      </svg>
    </Popup>
  );
}
