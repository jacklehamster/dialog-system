import React, { ReactNode, useContext } from 'react';
import { ControlContextType, DEFAULT_CONTROL_CONTEXT } from './ControlContext';
import { useInitControlContext } from './useInitControlContext';
import { PopupControl } from '../../controls/PopupControl';

interface Props {
  children: ReactNode;
  popupControl: PopupControl;
}

const Context = React.createContext<ControlContextType>(DEFAULT_CONTROL_CONTEXT);
const ControlContextProvider: React.FC<Props> = ({ children, popupControl }: Props) => {
  const context = useInitControlContext({ popupControl });
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useControlContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useControlContext must be used within a Provider');
  }
  return context;
};

export { ControlContextProvider };
