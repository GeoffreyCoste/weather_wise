import {Theme} from '@/context/themeContext';

export interface ThemeState {
  theme: Theme;
}

export type ThemeActionsType = InitTheme | SetLight | SetDark;

export enum ActionType {
  InitTheme,
  SetLight,
  SetDark
}

type InitTheme = {
  type: ActionType.InitTheme;
  payload: Theme;
};

type SetLight = {
  type: ActionType.SetLight;
  payload: Theme;
};

type SetDark = {
  type: ActionType.SetDark;
  payload: Theme;
};

export const initialState: ThemeState = {
  theme: 'light'
};

export const ThemeReducer = (state: ThemeState, action: ThemeActionsType) => {
  switch (action.type) {
    case ActionType.InitTheme:
      return {
        ...state,
        theme: action.payload
      };
    case ActionType.SetLight:
      return {
        ...state,
        theme: action.payload
      };
    case ActionType.SetDark:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
};

export const initTheme = (theme: Theme): InitTheme => ({
  type: ActionType.InitTheme,
  payload: theme
});

export const setLight = (theme: Theme): SetLight => ({
  type: ActionType.SetLight,
  payload: theme
});

export const setDark = (theme: Theme): SetDark => ({
  type: ActionType.SetDark,
  payload: theme
});