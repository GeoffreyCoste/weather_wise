'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Badge {
    badgeStyle: string
    textStyle: string;
    translation: {
        namespace: string,
        value: string
    };
    iconPath?: string;
    iconAlt?: string;
}

const Badge = ({badgeStyle, translation, textStyle, iconPath, iconAlt}: Badge) => {

    const [namespace, setNamespace] = useState('');
    const [value, setValue] = useState('');

    const t = useTranslations(namespace);

    useEffect(() => {
        if (translation) {
            const {namespace, value} = translation;
            setNamespace(() => namespace);
            setValue(() => value);
        }
    }, [translation, value]);

    return (
        <span className={badgeStyle}>
            {iconPath && iconAlt && (
                <Image
                    width={15}
                    height={15}
                    src={iconPath}
                    alt={iconAlt}
                    priority
                />
            )}
            {value && value.length && <p className={textStyle}>{t(value)}</p>}
        </span>
    )
}

export default Badge;