import React, { ReactNode, useContext } from 'react';
import { DEFAULT_GAME_CONTEXT, LayoutContextType } from './LayoutContext';

interface Props {
  children: ReactNode;
  context: LayoutContextType;
}

const Context = React.createContext<LayoutContextType>(DEFAULT_GAME_CONTEXT);
const LayoutContextProvider: React.FC<Props> = ({ children, context }: Props) => {
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useLayoutContext = (): LayoutContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useDialogContext must be used within a Provider');
  }
  return context;
};

export { LayoutContextProvider };
