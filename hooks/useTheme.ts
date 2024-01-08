'use client'

import {useContext} from 'react'
import {ThemeContext} from '@/context/themeContext'
import {ThemeContextInterface} from '@/context/themeContext'

export const useTheme = () => {
  const {state, dispatch} = useContext(ThemeContext) as ThemeContextInterface;
  const themeState = state;
  return {themeState, dispatch};
};