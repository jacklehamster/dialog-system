import '../text/ProgressiveText';
import { UserInterface } from '../ui/UserInterface';
import { Popup } from '../popup/Popup';
import { DialogModel } from '../model/DialogModel';
import { useMemo } from 'react';
import { MessageModel } from '../model/Message';

interface Props {
  dialog: DialogModel;
  ui: UserInterface;
}

export function Dialog({ dialog, ui }: Props): JSX.Element {
  const message = useMemo<MessageModel | undefined>(() => {
    if (dialog?.state) {
      const message = dialog.messages.at(dialog.state.index);
      return typeof(message) == "string" ? { text: message} : message;
    }
    return undefined;
  }, [dialog]);
  const disabled = false;

  return (
    <Popup popUid={dialog.uid!}
      layout={dialog.layout ?? {}}
      fontSize={dialog.style?.fontSize}
      disabled={disabled}
    >
      <div style={{
        padding: 10,
        width: "100%",
        height: "100%",
      }}
      onClick={() => console.log("ACTION")}>
        <progressive-text period="30">{message?.text}</progressive-text>
      </div>
    </Popup>
  );
}
