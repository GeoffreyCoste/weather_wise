'use client';

import React, {createContext, useReducer, useMemo, /* useEffect, */ PropsWithChildren} from 'react';
import {
  TemperatureReducer,
  initialState,
  TemperatureState,
  TemperatureActionsType,
  /* initTemperature */
} from '@/reducers/temperatureReducer';

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

  /* useEffect(() => {
    const tempInLocalStorage = localStorage.getItem('temperature');

    if (tempInLocalStorage !== null && JSON.parse(tempInLocalStorage)) {
      // Checking if there is already a state in localStorage
      // If yes, update the current state with the stored one
      dispatch(
        initTemperature(JSON.parse(localStorage.getItem('temperature')!))
      );
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      // Create and/or set a new localStorage variable called 'temperature'
      localStorage.setItem('temperature', JSON.stringify(state.temperature));
    }
  }, [state]); */

  return (
    <TemperatureContext.Provider value={currentTemperature}>
      {children}
    </TemperatureContext.Provider>
  );
};