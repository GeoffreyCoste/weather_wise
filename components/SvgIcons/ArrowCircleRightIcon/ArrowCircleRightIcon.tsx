'use client'

import { useTheme } from "@/hooks/useTheme"

export const ArrowCircleRightIcon = () => {

  const {themeState} = useTheme();

  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="ArrowCircleRightIcon_bgCarrier" strokeWidth="0"></g><g id="ArrowCircleRightIcon_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="ArrowCircleRightIcon_iconCarrier"> <path d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={themeState.theme === "light" ? '#1d4ed8' : '#38bdf8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
  )
}