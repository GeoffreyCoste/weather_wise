import React from 'react';
import Link from 'next/link';
import {LazyMotion, m, domAnimation} from 'framer-motion';
import {useTheme} from '@/hooks/useTheme';
import {useTranslations} from 'next-intl';
import {IntlMessages} from '@/global';

type Props = {
  item: string | IntlMessages;
};

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100}
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000}
    }
  }
};

export const NavItem = ({item}: Props) => {
  const t = useTranslations('LocaleLayout.header.navbar.navlinks');

  const {themeState} = useTheme();

  return (
    <LazyMotion features={domAnimation}>
      <m.li
        className={`pb-6 text-lg font-bold ${
          themeState.theme === 'light' ? 'text-blue-700' : 'text-white'
        }`}
        variants={variants}
      >
        <Link className="flex items-center justify-between" href={`/${item}`}>
          {t(item)}
          <span className="text-3xl">&#8250;</span>
        </Link>
      </m.li>
    </LazyMotion>
  );
};