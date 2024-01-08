'use client'

import {useContext} from 'react'
import { WindspeedContext } from '@/context/windspeedContext'
import { WindspeedContextInterface } from '@/context/windspeedContext'

export const useWindspeed = () => {
  const {state, dispatch} = useContext(WindspeedContext) as WindspeedContextInterface;
  const windspeedState = state;
  return {windspeedState, dispatch};
};