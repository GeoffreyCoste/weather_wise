'use client'

import Link from "next/link"
import { useTranslations } from "next-intl"

export const TermsContentBlock = () => {

    const t = useTranslations('TermsPage.description')

    return (
        <div className="sm:px-10 text-blue-700 dark:text-white">
            <p>
                {t('p0')}
            </p>
            <ul className="list-disc list-inside font-bold my-12">
                <li className="mb-4">
                    <Link href="/terms#terms_subtitle_1" className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:-z-1 before:bg-sky-400/25 before:w-[calc(100%+8px)] before:h-1 hover:before:h-[calc(100%+8px)] before:transition-all">{t('subtitle_1')}</Link>
                </li>
                <li className="mb-4">
                    <Link href="/terms#terms_subtitle_2" className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:-z-1 before:bg-sky-400/25 before:w-[calc(100%+8px)] before:h-1 hover:before:h-[calc(100%+8px)] before:transition-all">{t('subtitle_2')}</Link>
                </li>
                <li className="mb-4">
                    <Link href="/terms#terms_subtitle_3" className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:-z-1 before:bg-sky-400/25 before:w-[calc(100%+8px)] before:h-1 hover:before:h-[calc(100%+8px)] before:transition-all">{t('subtitle_3')}</Link>
                </li>
                <li className="mb-4">
                    <Link href="/terms#terms_subtitle_4" className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:-z-1 before:bg-sky-400/25 before:w-[calc(100%+8px)] before:h-1 hover:before:h-[calc(100%+8px)] before:transition-all">{t('subtitle_4')}</Link>
                </li>
                <li className="mb-4">
                    <Link href="/terms#terms_subtitle_5" className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:-z-1 before:bg-sky-400/25 before:w-[calc(100%+8px)] before:h-1 hover:before:h-[calc(100%+8px)] before:transition-all">{t('subtitle_5')}</Link>
                </li>
                <li className="mb-4">
                    <Link href="/terms#terms_subtitle_6" className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:-z-1 before:bg-sky-400/25 before:w-[calc(100%+8px)] before:h-1 hover:before:h-[calc(100%+8px)] before:transition-all">{t('subtitle_6')}</Link>
                </li>
                <li className="mb-4">
                    <Link href="/terms#terms_subtitle_7" className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:-z-1 before:bg-sky-400/25 before:w-[calc(100%+8px)] before:h-1 hover:before:h-[calc(100%+8px)] before:transition-all">{t('subtitle_7')}</Link>
                </li>
                <li className="mb-4">
                    <Link href="/terms#terms_subtitle_8" className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:-z-1 before:bg-sky-400/25 before:w-[calc(100%+8px)] before:h-1 hover:before:h-[calc(100%+8px)] before:transition-all">{t('subtitle_8')}</Link>
                </li>
                <li className="mb-4">
                    <Link href="/terms#terms_subtitle_9" className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:-z-1 before:bg-sky-400/25 before:w-[calc(100%+8px)] before:h-1 hover:before:h-[calc(100%+8px)] before:transition-all">{t('subtitle_9')}</Link>
                </li>
                <li className="mb-4">
                    <Link href="/terms#terms_subtitle_10" className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:-z-1 before:bg-sky-400/25 before:w-[calc(100%+8px)] before:h-1 hover:before:h-[calc(100%+8px)] before:transition-all">{t('subtitle_10')}</Link>
                </li>
                <li className="mb-4">
                    <Link href="/terms#terms_subtitle_11" className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:-z-1 before:bg-sky-400/25 before:w-[calc(100%+8px)] before:h-1 hover:before:h-[calc(100%+8px)] before:transition-all">{t('subtitle_11')}</Link>
                </li>
            </ul>
            <h2 id="terms_subtitle_1"className="text-2xl font-extrabold mt-12 mb-4">
                {t("subtitle_1")}
            </h2>
            <p>
                {t('p1')};
            </p>
            <h2 id="terms_subtitle_2"className="text-2xl font-extrabold mt-12 mb-4">
                {t("subtitle_2")}
            </h2>
            <p>
                {t('p2.1')}
            </p>
            <br />
            <p>
                {t('p2.2')}
            </p>
            <br />
            <p>
                {t('p2.3')}
            </p>
            <br />
            <p>
                {t('p2.4')}
            </p>
            <h2 id="terms_subtitle_3"className="text-2xl font-extrabold mt-12 mb-4">
                {t("subtitle_3")}
            </h2>
            <p>
                {t('p3.1')}
            </p>
            <br />
            <p>
                {t('p3.2')}
            </p>
            <br />
            <p>
                {t('p3.3')}
            </p>
            <h2 id="terms_subtitle_4"className="text-2xl font-extrabold mt-12 mb-4">
                {t("subtitle_4")}
            </h2>
            <p>
                {t('p4')}
            </p>
            <h2 id="terms_subtitle_5"className="text-2xl font-extrabold mt-12 mb-4">
                {t("subtitle_5")}
            </h2>
            <p>
                {t('p5')}
            </p>
            <h2 id="terms_subtitle_6"className="text-2xl font-extrabold mt-12 mb-4">
                {t("subtitle_6")}
            </h2>
            <p>
                {t('p6')}
            </p>
            <h2 id="terms_subtitle_7"className="text-2xl font-extrabold mt-12 mb-4">
                {t("subtitle_7")}
            </h2>
            <p>
                {t('p7')}
            </p>
            <h2 id="terms_subtitle_8"className="text-2xl font-extrabold mt-12 mb-4">
                {t("subtitle_8")}
            </h2>
            <p>
                {t('p8')}
            </p>
            <h2 id="terms_subtitle_9"className="text-2xl font-extrabold mt-12 mb-4">
                {t("subtitle_9")}
            </h2>
            <p>
                {t('p9')}
            </p>
            <h2 id="terms_subtitle_10"className="text-2xl font-extrabold mt-12 mb-4">
                {t("subtitle_10")}
            </h2>
            <p>
                {t('p10')}
            </p>
            <h2 id="terms_subtitle_11"className="text-2xl font-extrabold mt-12 mb-4">
                {t("subtitle_11")}
            </h2>
            <p>
                {t('p11')}
            </p>
        </div>
            
    )
}
