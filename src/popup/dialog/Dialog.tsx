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

  const position: [number, number] = [
    dialogData?.position?.[0] ?? 0,
    dialogData?.position?.[1] ?? 0,
  ];
  const size: [number | undefined, number | undefined] = [
    dialogData?.size?.[0],
    dialogData?.size?.[1],
  ];

  const { fontSize, positionFromRight, positionFromBottom } = dialogData;
  const { popupControl } = useGameContext();

  return (
    <Popup
      position={position}
      size={size}
      fontSize={fontSize}
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
