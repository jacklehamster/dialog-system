import { Popup } from '../base/Popup';
import { DialogData } from './DialogData';
import { useDialog } from './useDialog';
import { UserInterface } from '../UserInterface';
import { useGameContext } from '../context/Provider';
import './text/ProgressiveText';

interface Props {
  dialogData: DialogData;
  ui: UserInterface;
  onDone(): void;
}

export function Dialog({ dialogData, ui, onDone }: Props): JSX.Element {
  const { text, disabled } = useDialog({ dialogData, ui, onDone });

  const { popupControl } = useGameContext();

  return (
    <Popup popUid={dialogData.uid!}
      layout={dialogData.layout ?? {}}
      fontSize={dialogData.style?.fontSize}
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
