'use client'

import { useTranslations } from "next-intl"
import { useTheme } from "@/hooks/useTheme"
import { useModal } from "@/hooks/useModal"

export const ButtonOpenModal = () => {

  const {themeState} = useTheme();
  const {open} = useModal();

  const t = useTranslations('LocaleLayout');

  return (
    <button
        id="button-open-modal" 
        className="w-full sm:w-60 lg:w-72 sm:mr-24 md:mr-52 lg:mr-6 lg:max-w-7xl flex justify-between items-center bg-white hover:bg-gray-200 border-white dark:bg-blue-950 dark:hover:bg-blue-900 dark:border-blue-900 font-semibold mx-auto sm:mr-auto py-2 px-4 border border-2 rounded-full shadow z-20"
        type="button" 
        tabIndex={0} 
        role="button" 
        aria-label="button-open-modal"
        onClick={open}
    >
        <div className="flex items-center justify-between space-x-4">
              <svg
                className="h-5 w-5 text-gray-50 dark:text-gray-400"
                fill={`${themeState.theme === 'light' ? '#2563eb' : '#38bdf8'}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span
                className="text-blue-700 dark:text-sky-400"
              >
                {t('header.button_open_modal')}
              </span>
            </div>
            <span
              className="ml-auto rounded-full text-sm bg-blue-700 text-white dark:bg-sky-400 dark:text-[#172554] px-2"
            >
              ctrl K
            </span>
    </button>
  )
};