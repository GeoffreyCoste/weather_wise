'use client'

import { ReactNode } from "react"
import { useTheme } from "@/hooks/useTheme"


type Props = {
  classNames: string;
}

const BlockDisplayIcon = ({classNames}: Props): ReactNode => {

  const {themeState} = useTheme();

  return (
    <svg className={classNames} fill={themeState.theme === 'light' ? "#1d4ed8" : "#38bdf8"} viewBox="0 0 256 256" id="BlockDisplay" xmlns="http://www.w3.org/2000/svg"><g id="BlockDisplayIcon_bgCarrier" strokeWidth="0"></g><g id="BlockDisplayIcon_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="BlockDisplay_iconCarrier"> <path d="M180.00781,72h-144a20.02229,20.02229,0,0,0-20,20V204a20.02229,20.02229,0,0,0,20,20h144a20.02229,20.02229,0,0,0,20-20V92A20.02229,20.02229,0,0,0,180.00781,72Zm-4,128h-136V96h136Zm64-148V176a12,12,0,0,1-24,0V56h-152a12,12,0,0,1,0-24h156A20.02229,20.02229,0,0,1,240.00781,52Z"></path> </g></svg>
  )
}

export default BlockDisplayIcon;