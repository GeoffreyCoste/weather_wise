'use client'

import { useTranslations } from "next-intl"
import { UserAccountUpdatePasswordForm } from "./UserAccountUpdatePasswordForm"
import { User } from '@prisma/client'
import { UserAccountDelete } from "./UserAccountDelete"

export const UserAccountDetailsList = (props: Partial<User>) => {

    const {id} = props;

    const t = useTranslations('UserAccountPage');

    return (
        <div className="flow-root">
            <dl className="-my-3 divide-y divide-blue-300 dark:divide-white/25 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <div className="mb-4 lg:mb-0 lg:mt-1">
                        <dt className="text-lg font-bold text-blue-700 dark:text-white mb-4">{t('details_list.update_password.title')}</dt>
                        <dd className="text-blue-500 dark:text-white/75">{t('details_list.update_password.description')}</dd>
                    </div>
                    <div className="sm:col-span-2">
                        <UserAccountUpdatePasswordForm userId={id} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <div className="mb-4 lg:mb-0">
                        <dt className="text-lg font-bold text-blue-700    dark:text-white mb-4">{t('details_list.danger_zone.title')}</dt>
                        <dd className="text-blue-500 dark:text-white/75">{t('details_list.danger_zone.description')}</dd>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="w-full h-auto md:h-60 rounded-lg bg-white dark:bg-blue-950 p-11">
                            <UserAccountDelete />
                        </div>
                    </div>
                </div>
            </dl>
        </div>
    )
}


