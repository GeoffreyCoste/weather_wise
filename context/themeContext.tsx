'use client'

import {createContext, useReducer, useMemo, PropsWithChildren} from 'react';
import {
  ThemeReducer,
  initialState,
  ThemeState,
  ThemeActionsType
} from '@/reducers/themeReducer';

export type Theme = 'light' | 'dark';

export type ThemeContextInterface = {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeActionsType>;
};

export const ThemeContext = createContext<ThemeContextInterface>({
  state: initialState,
  dispatch: () => undefined
});

export const ThemeProvider = ({children}: PropsWithChildren) => {

  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  const currentTheme = useMemo(() => {
    return {state, dispatch};
  }, [state, dispatch]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};