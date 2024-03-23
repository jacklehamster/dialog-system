import '../text/ProgressiveText';
import { UserInterface } from '../ui/UserInterface';
import { Popup } from '../popup/Popup';
import { DialogModel } from '../model/DialogModel';
import { useCallback, useMemo } from 'react';
import { MessageModel } from '../model/Message';
import { LockStatus, useControlsLock } from '../controls/useControlsLock';
import { useDialogState } from '../state/useDialogState';

interface Props {
  dialog: DialogModel;
  ui: UserInterface;
}

export function Dialog({ dialog, ui }: Props): JSX.Element {
//   const { index, next } = useDialogState({ state: dialog });
//   const message = useMemo<MessageModel | undefined>(() => {
//     const message = dialog.messages.at(index);
//     return typeof(message) == "string" ? { text: message} : message;
// }, [index]);

//   const onAction = useCallback(() => next(), [next]);
//   const { lockState } = useControlsLock({
//     uid: dialog.uid, listener: useMemo(() => ({ onAction }), [onAction]),
//   });

//   return (
//     <Popup popUid={dialog.uid!}
//       layout={dialog.layout ?? {}}
//       fontSize={dialog.style?.fontSize}
//       disabled={lockState == LockStatus.LOCKED}
//     >
//       <div style={{
//         padding: 10,
//         width: "100%",
//         height: "100%",
//       }}
//       onClick={onAction}>
//         <progressive-text period="30">{message?.text}</progressive-text>
//       </div>
//     </Popup>
//   );
return <></>;
}
