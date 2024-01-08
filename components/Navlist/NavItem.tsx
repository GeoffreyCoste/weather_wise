'use client'

import Link from "next/link"
import { useTranslations } from "next-intl"
import {LazyMotion, m, domAnimation} from 'framer-motion'
import { IntlMessages } from "@/global"

export type ItemProps = {
    intlNamespace: string;
    intlMessage: string | IntlMessages;
    linkHref: string;
}

type NavItemProps = {
    item: ItemProps;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const NavItem = ({item, onClick}: NavItemProps) => {
    
    const {intlMessage, intlNamespace, linkHref} = item;

    const t = useTranslations(intlNamespace);
    
    return (
        <LazyMotion features={domAnimation}>
            <m.li
                className="pb-6 text-lg font-bold text-blue-700 dark:text-white"
            >
                <Link 
                    className="flex items-center justify-between" 
                    href={linkHref}
                    onClick={onClick}
                >
                    {t(intlMessage)}
                    <span className="text-3xl">&#8250;</span>
                </Link>
            </m.li>
        </LazyMotion>
    )
}

export default NavItem;