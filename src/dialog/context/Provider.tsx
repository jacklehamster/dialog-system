import React, { ReactNode, useContext } from 'react';
import Context from './Context';
import { DialogContextType } from './DialogContext';

interface Props {
  children: ReactNode;
  context: DialogContextType;
}

const Provider: React.FC<Props> = ({ children, context }: Props) => {
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

const useDialogContext = (): DialogContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useGameContext must be used within a Provider');
  }
  return context;
};

export { Provider, useDialogContext };
