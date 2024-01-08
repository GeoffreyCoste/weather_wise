'use client'

import React, {createContext, useReducer, useMemo, PropsWithChildren} from 'react'
import {
  WindspeedReducer,
  initialState,
  WindspeedState,
  WindspeedActionsType,
} from '@/reducers/windspeedReducer'

export type Windspeed = 'kmph' | 'mps';

export interface WindspeedContextInterface {
  state: WindspeedState;
  dispatch: React.Dispatch<WindspeedActionsType>;
}

export const WindspeedContext = createContext<WindspeedContextInterface>({
  state: initialState,
  dispatch: () => undefined
});

export const WindspeedProvider = ({children}: PropsWithChildren) => {
  
  const [state, dispatch] = useReducer(WindspeedReducer, initialState);

  const currentWindspeed = useMemo(() => {
    return {state, dispatch};
  }, [state, dispatch]);

  return (
    <WindspeedContext.Provider value={currentWindspeed}>
      {children}
    </WindspeedContext.Provider>
  );
};