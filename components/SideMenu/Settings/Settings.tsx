import React from 'react';
import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {useTheme} from '@/hooks/useTheme';
import ButtonLogin from '@/components/ButtonLogin/ButtonLogin';
import ButtonSignup from '@/components/ButtonSignup/ButtonSignup';
import ButtonGroupTemperatures from '@/components/ButtonGroupTemperatures/ButtonGroupTemperatures';
import ButtonGroupLanguages from '@/components/ButtonGroupLanguages/ButtonGroupLanguages';
import ButtonToggleTheme from '@/components/ButtonToggleTheme/ButtonToggleTheme';

const variants = {
  open: {
    opacity: 1,
    transition: {delay: 0.5}
  },
  closed: {
    opacity: 0
  }
};

type Props = {
  themeCookie: string;
  temperatureCookie: string;
};

const Settings = ({themeCookie, temperatureCookie}: Props) => {
  const t = useTranslations('LocaleLayout');

  const {themeState} = useTheme();

  return (
    <motion.div className="z-40" variants={variants}>
      <h3
        className={`mb-8 mt-8 font-bold ${
          themeState.theme === 'light' ? 'text-blue-700' : 'text-white'
        }`}
      >
        {t('side_menu.title_connection')}
      </h3>
      <ButtonLogin buttonIdPrefix="sidemenu-" styleVariations="w-full" />
      <ButtonSignup buttonIdPrefix="sidemenu-" styleVariations="w-full text-blue-700 border border-2 border-blue-700 dark:text-sky-400 dark:border-sky-400 mt-4" />
      <h3
        className={`mb-8 mt-12 font-bold ${
          themeState.theme === 'light' ? 'text-blue-700' : 'text-white'
        }`}
      >
        {t('side_menu.title_settings')}
      </h3>
      <h4
        className={`mr-auto text-xs font-bold ${
          themeState.theme === 'light' ? 'text-blue-700' : 'text-white/75'
        }`}
      >
        {t('side_menu.label_language')}
      </h4>
      <ButtonGroupLanguages />
      <h4
        className={`mr-auto mt-4 text-xs font-bold ${
          themeState.theme === 'light' ? 'text-blue-700' : 'text-white/75'
        }`}
      >
        {t('side_menu.label_degrees')}
      </h4>
      <ButtonGroupTemperatures temperatureCookie={temperatureCookie} />
      <ButtonToggleTheme checkboxId="sidemenu-theme-checkbox" themeCookie={themeCookie} buttonIdPrefix="sidemenu-" styleVariations="flex" />
    </motion.div>
  );
};

export default Settings;