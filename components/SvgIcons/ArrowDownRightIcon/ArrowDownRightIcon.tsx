'use client'

import { useTheme } from "@/hooks/useTheme"

export const ArrowDownRightIcon = () => {

  const {themeState} = useTheme();

  return (
    <svg className="w-3 h-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="ArrowDownRightIcon_bgCarrier" strokeWidth="0"></g><g id="ArrowDownRightIcon_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="ArrowDownRightIcon_iconCarrier"> <path stroke={themeState.theme === 'light' ? '#60a5fa' : '#38bdf8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.343 4.343l11.314 11.314m0 0h-9.9m9.9 0v-9.9"></path> </g></svg>
  )
}