'use client'

import { useTheme } from "@/hooks/useTheme"

type Props = {
  classNames: string;
}

const WaterDropIcon = ({classNames}: Props) => {

  const {themeState} = useTheme();

  return (
    <svg className={classNames} fill={themeState.theme === 'light' ? '#1d4ed8' : '#38bdf8'} viewBox="-5 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin"><g id="WaterDropIcon_bgCarrier" strokeWidth="0"></g><g id="WaterDropIcon_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="WaterDropIcon_iconCarrier"><path d="M2 13a5 5 0 0 0 10 0c0-1.726-1.66-5.031-5-9.653C3.66 7.969 2 11.274 2 13zM7 0c4.667 6.09 7 10.423 7 13a7 7 0 0 1-14 0c0-2.577 2.333-6.91 7-13z"></path></g></svg>
  )
}

export default WaterDropIcon;