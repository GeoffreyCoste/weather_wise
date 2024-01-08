'use client'

import { ReactNode } from "react"
import { useTheme } from "@/hooks/useTheme"


type Props = {
  classNames: string;
}

const ListDisplayIcon = ({classNames}: Props): ReactNode => {

  const {themeState} = useTheme();

  return (
    <svg className={classNames} fill={themeState.theme === 'light' ? "#1d4ed8" : "#38bdf8"} viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="ListDisplayIcon_bgCarrier" strokeWidth="0"></g><g id="ListDisplayIcon_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="ListDisplayIcon_iconCarrier"> <path d="M76,64A12.00028,12.00028,0,0,1,88,52H216a12,12,0,0,1,0,24H88A12.00028,12.00028,0,0,1,76,64Zm140,52H88.00586a12,12,0,1,0,0,24H216a12,12,0,0,0,0-24Zm0,64H88.00586a12,12,0,1,0,0,24H216a12,12,0,0,0,0-24ZM44,112a16,16,0,1,0,16,16A16.00016,16.00016,0,0,0,44,112Zm0-64A16,16,0,1,0,60,64,16.00016,16.00016,0,0,0,44,48Zm0,128a16,16,0,1,0,16,16A16.00016,16.00016,0,0,0,44,176Z"></path> </g></svg>
  )
}

export default ListDisplayIcon;