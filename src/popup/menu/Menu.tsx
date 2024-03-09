import { map } from 'abstract-list';
import { Popup } from '../base/Popup';
import { MenuData } from './MenuData';
import { UserInterface } from '../UserInterface';
import { useMenu } from './useMenu';
import { CSSProperties } from 'react';
import { useGameContext } from '../context/Provider';

interface Props {
  menuData: MenuData;
  ui: UserInterface;
  onDone(): void;
}

export function Menu({ menuData, ui, onDone }: Props): JSX.Element {
  const { scroll, scrollUp, scrollDown, selectedItem, select, disabled, menuHoverEnabled, enableMenuHover } = useMenu({ menuData, ui, onDone });

  const position: [number, number] = [
    menuData?.position?.[0] ?? 50,
    menuData?.position?.[1] ?? 50,
  ];
  const size: [number | undefined, number | undefined] = [
    menuData?.size?.[0],
    menuData?.size?.[1],
  ];

  const { popupControl } = useGameContext();
  return (
    <Popup
      position={position}
      size={size}
      fontSize={menuData.fontSize}
      positionFromBottom={!!menuData.positionFromBottom}
      positionFromRight={!!menuData.positionFromRight}
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
                color: selectedItem === item ? 'black' : 'white',
                backgroundColor: selectedItem === item ? 'white' : 'black',
                cursor: !item?.disabled ? "inherit" : "auto",
              };
              return (
                <div key={index} style={style}
                  onMouseMove={enableMenuHover}
                  onMouseOver={menuHoverEnabled ? () => select(index) : undefined}
                  onClick={menuHoverEnabled && !item?.disabled ? () => popupControl.onAction() : undefined}>
                  {item?.label}
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
