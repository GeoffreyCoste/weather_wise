'use client'

import { useTranslations } from 'next-intl'
import { UserSettingsTable } from './UserSettingsTable'

type Props = {
    themeCookie: string;
    temperatureCookie: string;
    windspeedCookie: string;
}

const UserSettingsContent = ({themeCookie, temperatureCookie, windspeedCookie}: Props) => {

    const t = useTranslations('UserSettingsPage');

    return (
        <section id="section-settings">
            <div className="w-full flex justify-center rounded-lg px-4 pb-8 pt-6 text-blue-700 dark:text-white bg-sky-100 dark:bg-[#0F1A3E]">
                <UserSettingsTable themeCookie={themeCookie} temperatureCookie={temperatureCookie} windspeedCookie={windspeedCookie} />
            </div>
        </section>
    )
}

export default UserSettingsContent;