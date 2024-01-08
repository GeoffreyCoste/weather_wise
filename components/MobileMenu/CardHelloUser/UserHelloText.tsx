'use client'

import { useTranslations } from "next-intl"

export const UserHelloText = () => {
    
    const t = useTranslations('LocaleLayout');

    const hours = new Date().getHours();
    const isDayTime = hours > 6 && hours < 20;

    return (
        <p className="text-sm font-semibold">{t(`side_menu.user_hello.${isDayTime ? 'day' : 'night'}`)}</p>
    )
}
