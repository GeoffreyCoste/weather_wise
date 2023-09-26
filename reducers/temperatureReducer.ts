import {Temperature} from '@/context/temperatureContext';

export interface TemperatureState {
  temperature: Temperature;
}

export type TemperatureActionsType =
  | InitTemperature
  | SetCelsius
  | SetFahrenheit;

export enum ActionType {
  InitTemperature,
  SetCelsius,
  SetFahrenheit
}

type InitTemperature = {
  type: ActionType.InitTemperature;
  payload: Temperature;
};

type SetCelsius = {
  type: ActionType.SetCelsius;
  payload: Temperature;
};

type SetFahrenheit = {
  type: ActionType.SetFahrenheit;
  payload: Temperature;
};

export const initialState: TemperatureState = {
  temperature: 'celsius'
};

export const TemperatureReducer = (
  state: TemperatureState,
  action: TemperatureActionsType
) => {
  switch (action.type) {
    case ActionType.InitTemperature:
      return {
        ...state,
        temperature: action.payload
      };
    case ActionType.SetCelsius:
      return {
        ...state,
        temperature: action.payload
      };
    case ActionType.SetFahrenheit:
      return {
        ...state,
        temperature: action.payload
      };
    default:
      return state;
  }
};

export const initTemperature = (temperature: Temperature): InitTemperature => ({
  type: ActionType.InitTemperature,
  payload: temperature
});

export const setCelsius = (temperature: Temperature): SetCelsius => ({
  type: ActionType.SetCelsius,
  payload: temperature
});

export const setFahrenheit = (temperature: Temperature): SetFahrenheit => ({
  type: ActionType.SetFahrenheit,
  payload: temperature
});