'use client';

import {useTheme} from '@/hooks/useTheme';

export const getWeatherSvgIconPath = (
  code: number,
  is_day: number,
  is_daily_display: boolean
) => {
  const {themeState} = useTheme();

  let path;

  switch (code) {
    case 0:
      path = `/images/weather_0_${
        is_daily_display ? 'day' : is_day ? 'day' : 'night'
      }.svg`;
      break;
    case 1:
      path = `/images/weather_1_${
        themeState.theme === 'light' ? 'light' : 'dark'
      }_${is_daily_display ? 'day' : is_day ? 'day' : 'night'}.svg`;
      break;
    case 45:
      path = '/images/weather_45.svg';
      break;
    default:
      path = `/images/weather_${code}_${
        themeState.theme === 'light' ? 'light' : 'dark'
      }.svg`;
      break;
  }
  return path;
};