import '../text/ProgressiveText';
import { UserInterface } from '../ui/UserInterface';
import { Popup } from '../common/popup/Popup';
import { DialogModel } from '../model/DialogModel';
import { useMemo } from 'react';
import { MessageModel } from '../model/Message';
import { useDialogState } from '../state/useDialogState';
import { LockStatus, useControlsLock } from '../controls/useControlsLock';

interface Props {
  dialog: DialogModel;
  onClose(): void;
}

export function Dialog({ dialog, onClose }: Props): JSX.Element {
  const { next, index } = useDialogState(dialog);

  const { lockState, popupControl } = useControlsLock({
    uid: dialog.uid,
    listener: useMemo(() => ({
      onAction: () => next(),
    }), [next]),
  });

  const message = useMemo<MessageModel | undefined>(() => {
    const message = dialog.messages.at(index);
    return typeof(message) == "string" ? { text: message} : message;
  }, [index]);

  return (
    <Popup uid={dialog.uid!}
      layout={dialog.layout ?? {}}
      style={dialog.style}
      disabled={lockState === LockStatus.LOCKED}
    >
      <div style={{
        padding: 10,
        width: "100%",
        height: "100%",
      }}
      onClick={() => popupControl.onAction()}>
        <progressive-text period="30">{message?.text}</progressive-text>
      </div>
    </Popup>
  );
}
