'use client'

import { useTheme } from "@/hooks/useTheme"

export const TextCopyright = () => {

    const {themeState} = useTheme();
    
  return (
    <div
      className={`mt-10 flex basis-full items-center justify-center ${
        themeState.theme === 'light' ? 'text-blue-700' : 'text-white'
      }`}
    >
      <p className="text-xs sm:text-base">&#169; 2023 Weather Wise</p>
    </div>
  )
}
