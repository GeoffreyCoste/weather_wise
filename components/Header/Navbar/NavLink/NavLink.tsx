'use client'

import { ComponentProps } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  title: string
};

export const NavLink = ({href, title, ...rest}: Props) => {
  const locale = useLocale();
  const pathname = usePathname();
  const isActive = pathname === `${locale === 'en' ? '/en' : ''}${href}`;
  
  const t = useTranslations('LocaleLayout')

  return (
    <Link
      aria-current={isActive}
      className={`inline-block flex w-full items-center justify-between border-b-2 border-blue-100 px-4 py-1 transition-colors lg:w-auto lg:border-none lg:py-3 ${isActive ? 'font-bold text-blue-700 dark:text-white lg:hover:text-blue-400' : 'font-medium text-blue-700 lg:hover:text-blue-600/75 dark:text-sky-300 lg:dark:hover:text-zinc-200'}`}
      href={href}
      {...rest}
    >{t(`header.navbar.navlinks.${title}`)}</Link>
  )
}