'use client'

import { useTranslations } from 'next-intl'
import ButtonGroupLanguages from '@/components/ButtonGroupLanguages/ButtonGroupLanguages'
import ButtonGroupTemperatures from '@/components/ButtonGroupTemperatures/ButtonGroupTemperatures'
import React from 'react'
import ButtonToggleTheme from '@/components/ButtonToggleTheme/ButtonToggleTheme'
import ButtonGroupWindspeed from '@/components/ButtonGroupWindspeed/ButtonGroupWindspeed'

type Props = {
    themeCookie: string;
    temperatureCookie: string;
    windspeedCookie: string
}

export const UserSettingsTable = ({themeCookie, temperatureCookie, windspeedCookie}: Props) => {

    const t = useTranslations('UserSettingsPage');

    return (
        <div className="w-full grid grid-flow-row auto-rows-max divide-y-2 divide-blue-200 dark:divide-blue-900 border-2 border-blue-200 dark:border-blue-900 rounded-lg">
            <div className="flex items-center p-4">
                <div className="w-full grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-12">
                    <div className="col-span-7">
                        <h2 className="font-bold">{t('settings.theme.title')}</h2>
                        <p className="text-xs">{t('settings.theme.description')}</p>
                    </div>
                    <div className="col-span-5">
                        <div className="flex justify-end z-20">
                            <ButtonToggleTheme checkboxId="checkbox-theme-toggle" themeCookie={themeCookie} /> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center p-4">
                <div className="w-full grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-12">
                    <div className="col-span-7">
                        <h2 className="font-bold">{t('settings.languages.title')}</h2>
                        <p className="text-xs">{t('settings.languages.description')}</p>
                    </div>
                    <div className="col-span-5">
                        <div className="max-w-[150px] ml-auto">
                            <ButtonGroupLanguages />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col p-4">
                <div className="basis-full">
                    <h2 className="font-bold">{t('settings.units.title')}</h2>
                    <p className="text-xs">{t('settings.units.description')}</p>
                </div>

                <div className="grid grid-cols-12 grid-rows-2 mt-4">
                    <div className="col-span-2"></div>
                    <div className="col-span-10 flex flex-wrap items-center border-b-2 border-blue-200 dark:border-blue-900 pb-4">
                        <h3 className="text-sm font-semibold mt-2">{t   ('settings.units.datas.temperatures')}</h3>
                        <div className="basis-full max-w-[150px] ml-auto">
                            <ButtonGroupTemperatures temperatureCookie={temperatureCookie} />
                        </div>
                    </div>
                    <div className="col-span-2"></div>
                    <div className="col-span-10 flex flex-wrap items-center py-4">
                        <h3 className="text-sm font-semibold">{t('settings.units.datas.windspeed')}</h3>
                        <div className="basis-full max-w-[150px] ml-auto">
                            <ButtonGroupWindspeed windspeedCookie=      {windspeedCookie} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}