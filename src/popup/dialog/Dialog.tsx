import { Popup } from '../base/Popup';
import { DialogData } from './DialogData';
import { useDialog } from './useDialog';
import { UserInterface } from '../UserInterface';
import './text/ProgressiveText';
import { useGameContext } from '../context/Provider';

interface Props {
  dialogData: DialogData;
  ui: UserInterface;
  onDone(): void;
}

export function Dialog({ dialogData, ui, onDone }: Props): JSX.Element {
  const { text, disabled } = useDialog({ dialogData, ui, onDone });
  const layout = dialogData.layout ?? {};

  const position: [number, number] = [
    layout?.position?.[0] ?? 0,
    layout?.position?.[1] ?? 0,
  ];
  const size: [number | undefined, number | undefined] = [
    layout?.size?.[0],
    layout?.size?.[1],
  ];

  const { positionFromRight, positionFromBottom } = layout;
  const { popupControl } = useGameContext();

  return (
    <Popup
      position={position}
      size={size}
      fontSize={dialogData.style?.fontSize}
      positionFromBottom={positionFromBottom}
      positionFromRight={positionFromRight}
      disabled={disabled}
    >
      <div style={{
        padding: 10,
        width: "100%",
        height: "100%",
      }}
      onClick={() => popupControl.onAction()}>
        <progressive-text period="30">{text}</progressive-text>
      </div>
    </Popup>
  );
}
