"use client"

import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

type Props = {
    title: string;
    children: ReactNode;
    translationNamespace: string;
}

export const DropdownInline = ({title, children, translationNamespace}: Props) => {

    const t = useTranslations(translationNamespace);

    return (
        <details className="group/dropdownInline [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer justify-between items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
          >
            <span className="text-sm font-medium">{t(title)}</span>
    
            <span className="transition group-open/dropdownInline:-rotate-180">
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
    
          <div
            className="group-open/dropdownInline:mt-2"
          >
            {children}
          </div>
        </details>
    )
}
