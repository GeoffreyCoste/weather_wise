import {Windspeed} from '@/context/windspeedContext';

export interface WindspeedState {
  windspeed: Windspeed;
}

export type WindspeedActionsType =
  | InitWindspeed
  | SetKmph
  | SetMps;

export enum ActionType {
  InitWindspeed,
  SetKmph,
  SetMps
}

type InitWindspeed = {
  type: ActionType.InitWindspeed;
  payload: Windspeed;
};

type SetKmph = {
  type: ActionType.SetKmph;
  payload: Windspeed;
};

type SetMps = {
  type: ActionType.SetMps;
  payload: Windspeed;
};

export const initialState: WindspeedState = {
  windspeed: 'kmph'
};

export const WindspeedReducer = (
  state: WindspeedState,
  action: WindspeedActionsType
) => {
  switch (action.type) {
    case ActionType.InitWindspeed:
      return {
        ...state,
        windspeed: action.payload
      };
    case ActionType.SetKmph:
      return {
        ...state,
        windspeed: action.payload
      };
    case ActionType.SetMps:
      return {
        ...state,
        windspeed: action.payload
      };
    default:
      return state;
  }
};

export const initWindspeed = (windspeed: Windspeed): InitWindspeed => ({
  type: ActionType.InitWindspeed,
  payload: windspeed
});

export const setKmph = (windspeed: Windspeed): SetKmph => ({
  type: ActionType.SetKmph,
  payload: windspeed
});

export const setMps = (windspeed: Windspeed): SetMps => ({
  type: ActionType.SetMps,
  payload: windspeed
});