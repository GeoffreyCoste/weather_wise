'use client';

import {useContext} from 'react';
import {TemperatureContext} from '@/context/temperatureContext';
import {TemperatureContextInterface} from '@/context/temperatureContext';

export const useTemperature = () => {
  const {state, dispatch} = useContext(TemperatureContext) as TemperatureContextInterface;
  const temperatureState = state;
  return {temperatureState, dispatch};
};