'use client'

import { useTheme } from "@/hooks/useTheme"

export const ArrowUpRightIcon = () => {

  const {themeState} = useTheme();

  return (
    <svg className="w-3 h-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="ArrowUpRightIcon_bgCarrier" strokeWidth="0"></g><g id="ArrowUpRightIcon_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="ArrowUpRightIcon_iconCarrier"> <path stroke={themeState.theme === 'light' ? '#60a5fa' : '#38bdf8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.343 15.657L15.657 4.343m0 0v9.9m0-9.9h-9.9"></path> </g></svg>
  )
}