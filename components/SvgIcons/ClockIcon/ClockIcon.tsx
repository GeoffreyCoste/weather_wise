'use client'

import { useTheme } from "@/hooks/useTheme"

export const ClockIcon = () => {

  const {themeState} = useTheme();

  return (
    <svg className="h-4 w-4 z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Clock_bgCarrier" strokeWidth="0"></g><g id="Clock_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="Clock_iconCarrier"> <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={themeState.theme === 'light' ? '#60a5fa' : '#38bdf8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
  )
}