"use client"

import { useTranslations } from "next-intl"
import { ReactNode } from "react"

type Props = {
    title: string;
    translationNamespace: string;
    children: ReactNode;
}

export const DropdownStacked = ({title, translationNamespace, children}: Props) => {
  
  const t = useTranslations(translationNamespace);

  return (
    <details
      className="group/dropdownStacked w-full overflow-hidden rounded-lg border-2 border-blue-700 dark:border-sky-400 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary
        className="flex cursor-pointer items-center justify-between gap-2 p-4  text-blue-700 bg-white dark:text-white dark:bg-[#0F1A3E] transition"
      >
        <span className="text-sm font-bold">{t(title)}</span>

        <span className="transition group-open/dropdownStacked:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </summary>

      {children}
    </details>
  )
}
