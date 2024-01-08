'use client'

import { useTheme } from "@/hooks/useTheme"

type Props = {
  classNames: string;
}

const NavigationIcon = ({classNames}: Props) => {

  const {themeState} = useTheme();

  return (
    <svg className={classNames} fill={themeState.theme === 'light' ? '#1d4ed8' : '#38bdf8'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="NavigationIcon_bgCarrier" strokeWidth="0"></g><g id="NavigationIcon_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="NavigationIcon_iconCarrier"> <g data-name="Layer 2"> <g data-name="navigation"> <rect width="24" height="24" opacity="0"></rect> <path d="M20 20a.94.94 0 0 1-.55-.17l-6.9-4.56a1 1 0 0 0-1.1 0l-6.9 4.56a1 1 0 0 1-1.44-1.28l8-16a1 1 0 0 1 1.78 0l8 16a1 1 0 0 1-.23 1.2A1 1 0 0 1 20 20z"></path> </g> </g> </g></svg>
  )
}

export default NavigationIcon;