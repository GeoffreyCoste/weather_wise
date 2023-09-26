'use client'

import { useTheme } from "@/hooks/useTheme";
import { useModal } from "@/hooks/useModal";

export const ButtonCloseModal = () => {

  const {themeState} = useTheme();
  const {close} = useModal();

  return (
    <button
        id="button-close-modal" 
        className="absolute right-0 flex cursor-pointer items-center pr-3" 
        type="button" 
        tabIndex={0} 
        role="button" 
        aria-label="button-close-modal"
        onClick={close}
    >
      <svg
        className="h-8 w-8 text-gray-50 dark:text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            d="M16 8L8 16M8.00001 8L16 16"
            stroke={
              themeState.theme === 'light' ? '#1d4ed8' : '#38bdf8'
            }
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{' '}
        </g>
      </svg>
    </button>
  )
};