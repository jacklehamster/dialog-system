import React from 'react';
import { DEFAULT_GAME_CONTEXT, DialogContextType } from './DialogContext';

const Context = React.createContext<DialogContextType>(DEFAULT_GAME_CONTEXT);
export default Context;
