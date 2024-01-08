'use client'

import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowCircleRightIcon } from "@/components/SvgIcons/ArrowCircleRightIcon/ArrowCircleRightIcon";

type Props = {
  href: string;
}

const LinkNavigateForward = ({href}: Props) => {

    const t = useTranslations('DashboardMainPage');

    return (
      <Link href={href} prefetch={true}>
        <span className="relative hidden sm:flex items-center text-sm font-bold text-blue-700 dark:text-sky-400 mr-4 pr-1 hover:underline hover:underline-offset-4 before:absolute before:w-2.5 before:h-2.5 before:top-1/2 before:left-[100%] before:-translate-y-1/2 before:rotate-45 before:border-solid before:border-t-[3px] before:border-r-[3px] before:dark:border-sky-400 before:border-blue-700 before:rounded-sm before:transition-all hover:before:translate-x-1 hover:before:-translate-y-1/2 hover:before:rotate-45">
          {t('forecastsCard.button_show_more')}
        </span>
        <span className="sm:hidden">
          <ArrowCircleRightIcon />
        </span>
      </Link>
    )
}

export default LinkNavigateForward;