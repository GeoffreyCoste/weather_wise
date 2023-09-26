"use client"

import { useTranslations } from "next-intl"

type Props = {
  buttonIdPrefix?: string;
  styleVariations?: string;
}

const ButtonSignup = ({buttonIdPrefix, styleVariations}: Props) => {
  const t = useTranslations('LocaleLayout');

  return (
    <button 
        id={`${buttonIdPrefix ?? ""}button-signup`} 
        className={`font-semibold rounded-full px-4 py-2 ${styleVariations ?? ""}`}
        type="button" 
        tabIndex={0} 
        role="button" 
        aria-label="login"
    >
        {t('button_signup')}
    </button>
  )
}

export default ButtonSignup;