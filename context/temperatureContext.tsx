'use client';

import React, {createContext, useReducer, useMemo, PropsWithChildren} from 'react'
import {
  TemperatureReducer,
  initialState,
  TemperatureState,
  TemperatureActionsType,
} from '@/reducers/temperatureReducer'

export type Temperature = 'celsius' | 'fahrenheit';

export interface TemperatureContextInterface {
  state: TemperatureState;
  dispatch: React.Dispatch<TemperatureActionsType>;
}

export const TemperatureContext = createContext<TemperatureContextInterface>({
  state: initialState,
  dispatch: () => undefined
});

export const TemperatureProvider = ({children}: PropsWithChildren) => {
  
  const [state, dispatch] = useReducer(TemperatureReducer, initialState);

  const currentTemperature = useMemo(() => {
    return {state, dispatch};
  }, [state, dispatch]);

  return (
    <TemperatureContext.Provider value={currentTemperature}>
      {children}
    </TemperatureContext.Provider>
  );
};