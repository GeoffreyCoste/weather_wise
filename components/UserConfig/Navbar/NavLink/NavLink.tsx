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
  
  const t = useTranslations('UserConfigLayout');

  return (
    <Link
      aria-current={isActive}
      className={`inline-block flex w-full items-center justify-center md:justify-between text-center text-sm md:text-lg border-b-2 border-blue-100 px-4 py-1 transition-colors lg:w-auto lg:border-none lg:py-3 relative z-10 before:absolute before:-z-10 before:top-0 before:right-0 before:block before:bg-sky-100 before:dark:bg-[#0F1A3E] before:rounded-t-lg lg:before:rounded-tr-none lg:before:rounded-l-lg before:transition-all ${isActive ? 'font-extrabold text-blue-700 dark:text-white lg:hover:text-blue-400 before:w-full before:h-full md:before:w-full md:h-full' : 'font-medium text-blue-700 lg:hover:text-blue-600/75 dark:text-sky-300 lg:dark:hover:text-zinc-200 before:w-full before:h-0 md:before:w-0 md:h-full'}`}
      href={href}
      {...rest}
    >
      {t(`navbar.navlinks.${title}`)}
    </Link>
  )
}