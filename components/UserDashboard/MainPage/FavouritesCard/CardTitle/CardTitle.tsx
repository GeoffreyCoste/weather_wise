'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import StarIcon from '@/public/icons/star.svg'

const CardTitle = () => {

    const t = useTranslations('DashboardMainPage');

    return (
        <div className="flex gap-x-2">
            <h2 className="font-extrabold text-blue-700 dark:text-white text-lg">
                {t('favouritesCard.title')}
            </h2>
            <Image
                width={20}
                height={20}
                src={StarIcon}
                alt="Star Icon"
                priority
            />
        </div>
    )
}

export default CardTitle;