'use client'

import Image from 'next/image';
import { useTranslations } from 'next-intl'
import StarIcon from '@/public/icons/star.svg'

const FavouritesPageTitle = () => {

    const t = useTranslations('DashboardFavouritesPage');

    return (
        <h1 className="flex items-center font-black text-blue-700 dark:text-white text-xl mb-4">
            {t('title')}
            <Image
                width={20}
                height={20}
                className="ml-2"
                src={StarIcon}
                alt="Star Icon"
                priority
            />
        </h1>
    )
}

export default FavouritesPageTitle;