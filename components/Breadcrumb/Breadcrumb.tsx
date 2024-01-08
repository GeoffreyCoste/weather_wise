'use client'

import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"
import { useTranslations } from "next-intl";

const Breadcrumb = () => {

  const segments = useSelectedLayoutSegments();

  const t = useTranslations('DashboardLayout');

  return (
    <nav className={`${!segments.length ? "hidden" : "hidden lg:flex"} mb-4`} aria-label="Breadcrumb">
      <ul className="inline-flex items-center space-x-1 md:space-x-3">
        <li key="0-a8402dcd-470b-405c-a813-bbc1450bfd61" className="inline-flex items-center" >
          <Link 
            href="/user/dashboard/"
            className="inline-flex items-center text-sm font-medium text-blue-300 hover:text-blue-700 hover:underline dark:text-gray-400 dark:hover:text-white"
          >
            {t('breadcrumb.dashboard')}
          </Link>
        </li>

        {segments.map((segment, index) => {
          if (index !== segments.length - 1) {
            return (
              <li key={`${index + 1}-a8402dcd-470b-405c-a813-bbc1450bfd61`} className="inline-flex items-center">
                <div className="flex items-center">
                  <svg className="w-2 h-2 text-blue-300 dark:text-gray-400 mx-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m1 9 4-4-4-4"/>
                  </svg>
                  <Link 
                    href={`/user/dashboard/${segment}`} 
                    className="inline-flex items-center text-sm font-medium text-blue-300 hover:text-blue-700 hover:underline dark:text-gray-400 dark:hover:text-white ml-1"
                  >
                    {t(`breadcrumb.${segment}`)}
                  </Link>
                </div>
              </li>
            )
          } else {
            return (
              <li key={`${index + 1}-a8402dcd-470b-405c-a813-bbc1450bfd61`} className="inline-flex items-center" aria-current="page">
                <div className="flex items-center">
                  <svg className="w-2 h-2 text-blue-300 dark:text-gray-400 mx-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-blue-300 dark:text-gray-400 md:ml-2 capitalize">
                    {segments.length === 2 ? decodeURIComponent(segment.replace(/-\d*$/gm, '').split('-').join(' ')) : t(`breadcrumb.${segment}`)}
                  </span>
                </div>
              </li>
            )
          }
        })}
      </ul>
    </nav>
  )
}

export default Breadcrumb;