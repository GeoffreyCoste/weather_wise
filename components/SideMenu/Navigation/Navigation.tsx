import React from 'react';
import {LazyMotion, m, domAnimation} from 'framer-motion';
import { NavItem } from './NavItem/NavItem';

const itemIds = [0, 1, 2];
const itemList = ['about', 'terms', 'contact'];

const variants = {
  open: {
    transition: {staggerChildren: 0.07, delayChildren: 0.2}
  },
  closed: {
    transition: {staggerChildren: 0.05, staggerDirection: -1}
  }
};

export const Navigation = () => (
  <LazyMotion features={domAnimation}>
    <m.ul 
      id="mobile-nav"
      className="z-40 mt-[25rem] md:mt-[35rem]" 
      variants={variants}
      role="navigation"
      aria-label="Main"
    >
      {itemIds.map((i) => (
        <NavItem
          item={itemList[i]}
          key={`${i}-5358a2fd-dddb-4347-b9d6-2cf3b37769e6`}
        />
      ))}
    </m.ul>
  </LazyMotion>
);