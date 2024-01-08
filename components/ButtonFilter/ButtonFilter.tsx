'use client'

import { useTranslations } from "next-intl"

type Props = {
    activeFilter: string;
    filter: string;
    setActiveFilter: (param: string | any) => void;
    namespace: string;
    message: string;
}

const ButtonFilter = ({activeFilter, filter, setActiveFilter, namespace, message}: Props) => {
  const t = useTranslations(`${namespace}`);
  const isActive = activeFilter === filter;

  return (
    <button 
        className={`w-full lg:w-auto text-sm font-bold rounded-full px-4 py-2 ${isActive ? "text-white dark:text-[#0F1A3E] bg-blue-700 lg:hover:bg-blue-800 dark:bg-sky-400 lg:dark:hover:bg-sky-500 border border-2 border-blue-700 lg:hover:border-blue-800 dark:border-sky-400 lg:dark:hover:border-sky-500" : "text-blue-300 lg:hover:text-blue-700 dark:text-sky-600 lg:dark:hover:text-sky-400 bg-transparent dark:bg-transparent border border-2 border-blue-300 lg:hover:border-blue-700 dark:border-sky-600 lg:dark:hover:border-sky-400"}`}
        type="button" 
        tabIndex={0} 
        role="button" 
        aria-label={`${filter}-filter`}
        onClick={() => setActiveFilter(filter)}
    >
        {t(`${message}`)}
    </button>
  )
}

export default ButtonFilter;