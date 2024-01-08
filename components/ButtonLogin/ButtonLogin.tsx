"use client"

import Link from "next/link";
import { useTranslations } from "next-intl"

type Props = {
  buttonIdPrefix?: string;
  styleVariations?: string;
  onClick?: () => void;
}

const ButtonLogin = ({buttonIdPrefix, styleVariations, onClick}: Props) => {
  const t = useTranslations('LocaleLayout');

  return (
    <Link href="/login" onClick={onClick}>
      <button 
          id={`${buttonIdPrefix ?? ""}button-login`} 
          className={`font-semibold rounded-full px-4 py-2 text-white bg-gradient-to-tr from-blue-700 to-blue-400 lg:hover:bg-gradient-to-tl dark:text-[#172554] dark:bg-gradient-to-tr dark:from-sky-400 dark:to-cyan-300 lg:dark:hover:bg-gradient-to-tl ${styleVariations ?? ""}`}
          type="button" 
          tabIndex={0} 
          role="button" 
          aria-label="login"
      >
          {t('button_login')}
      </button>
    </Link>
    
  )
}

export default ButtonLogin;