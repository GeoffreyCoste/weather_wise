'use client'

import { useLocale } from "next-intl"
import { UserInfos } from "./UserProfileContent"

const UserProfileTitle = (props: UserInfos) => {

    const {userFirstName, userLastName, userLocation, } = props;

    const locale = useLocale();

    return (
        <div className="mt-6 text-center">
            <h1 className="font-black text-blue-700 dark:text-white text-2xl">
                {userFirstName} {userLastName}
            </h1>
            <span className="text-sm font-bold text-blue-700/75 dark:text-white/75">{locale === 'fr' ? userLocation.labelFr : userLocation.labelEn}</span>
        </div>

    )
}

export default UserProfileTitle;