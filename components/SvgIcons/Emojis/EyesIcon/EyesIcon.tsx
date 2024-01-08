'use client'

import { useTheme } from "@/hooks/useTheme"

type Props = {
  classNames: string;
}

const EyesIcon = ({classNames}: Props) => {

  const {themeState} = useTheme();

  return (
    <svg className={classNames} xmlns="http://www.w3.org/2000/svg" id="eyes_svg" viewBox="0 0 31.0309831 14.6695411">
      <g id="eyes">
        <path fill={themeState.theme === 'light' ? '#1d4ed8' : '#38bdf8'} strokeWidth={0} d="m8.3140998,8.2847411c0,1.7986-1.458,3.2567-3.2566,3.2567s-3.2567-1.4581-3.2567-3.2567,1.4581-3.2566,3.2567-3.2566,3.2566,1.458,3.2566,3.2566Z"/>
        <path fill={themeState.theme === 'light' ? '#1d4ed8' : '#38bdf8'} strokeWidth={0} d="m29.2323998,8.2847411c0,1.7986-1.4581,3.2567-3.2567,3.2567s-3.2566-1.4581-3.2566-3.2567,1.458-3.2566,3.2566-3.2566,3.2567,1.458,3.2567,3.2566Z"/>
      </g>
    </svg>
  )
}

export default EyesIcon;