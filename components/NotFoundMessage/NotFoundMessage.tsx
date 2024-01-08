'use client'

import { useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useAnimate } from "framer-motion"
import { LogoBulbIcon } from "../SvgIcons/LogoBulbIcon/LogoBulbIcon"

export const NotFoundMessage = () => {

    const t = useTranslations('NotFoundPage');

    const [scope, animate] = useAnimate();

    const handleAnimate = () => {
      animate("#sticker", {x: -95, opacity: 1, scale: [100, 1], rotate: 348}, {duration: 0.5});
      animate("#bubble-1", {opacity: [0, 1]}, {delay: 1, duration: 1});
      animate("#bubble-2", {opacity: [0, 1]}, {delay: 1, duration: 1});
      animate("#bubble-3", {opacity: [0, 1]}, {delay: 1, duration: 1});
      animate("#bubble-4", {opacity: [0, 1]}, {delay: 1, duration: 1});
      animate("#bubble-1", {y: [-10, 10]}, {duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "linear"});
      animate("#bubble-2", {y: [-10, 10]}, {duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "linear"});
      animate("#bubble-3", {y: [-10, 10]}, {duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "linear"});
      animate("#bubble-4", {y: [-10, 10]}, {duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "linear"});
      animate("#circle-1", {opacity: [0, 1, 0]}, {delay: 1.5, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "linear"});
      animate("#circle-2", {opacity: [0, 1, 0]}, {delay: 1.5, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "linear"});
      animate("#circle-3", {opacity: [0, 1, 0]}, {delay: 1.5, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "linear"});
      animate("#circle-4", {opacity: [0, 1, 0]}, {delay: 1.5, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "linear"});
      animate("#circle-5", {opacity: [0, 1, 0]}, {delay: 1.5, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "linear"});
      animate("#circle-6", {opacity: [0, 1, 0]}, {delay: 1.5, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "linear"});
    }

    useEffect(() => {
      handleAnimate();
    });

    return (
        <div ref={scope} className="w-full relative flex flex-col items-center justify-center pt-16 pb-12">
          <h1 id="sticker" className="absolute top-16 left-1/2 -translate-x-1/2 z-30 text-base text-blue-700 dark:text-[#0f1a3e] font-bold bg-yellow-400 px-4 py-2 rounded-lg opacity-0 scale-50">
              {t('title')}
          </h1>
          
          <div className="w-1/2 z-20">
            <div className="flex justify-center items-center">
              <LogoBulbIcon classNames="w-44 h-44" />
            </div>
          </div>
          
          <div id="bubble-1" className="w-24 h-24 absolute top-12 left-60 flex justify-center items-center text-sky-300 text-6xl font-black bg-sky-100 dark:bg-blue-900 rounded-full">?</div>
          <div id="bubble-2" className="w-12 h-12 absolute top-44 left-80 flex justify-center items-center text-sky-300 text-3xl font-black bg-sky-100 dark:bg-blue-900 rounded-full">?</div>
          <div id="bubble-3" className="w-24 h-24 absolute top-26 right-60 flex justify-center items-center text-sky-300 text-6xl font-black bg-sky-100 dark:bg-blue-900 rounded-full">?</div>
          <div id="bubble-4" className="w-12 h-12 absolute top-14 right-[300px] flex justify-center items-center text-sky-300 text-3xl font-black bg-sky-100 dark:bg-blue-900 rounded-full">?</div>
          
          <div id="circle-1" className="w-3 h-3 absolute top-4 left-[360px] flex justify-center items-center bg-sky-100 dark:bg-blue-900 rounded-full"></div>
          <div id="circle-2" className="w-3 h-3 absolute top-40 left-72 flex justify-center items-center bg-sky-100 dark:bg-blue-900 rounded-full"></div>
          <div id="circle-3" className="w-3 h-3 absolute bottom-28 left-96 flex justify-center items-center bg-sky-100 dark:bg-blue-900 rounded-full"></div>
          <div id="circle-4" className="w-3 h-3 absolute top-6 right-[360px] flex justify-center items-center bg-sky-100 dark:bg-blue-900 rounded-full"></div>
          <div id="circle-5" className="w-3 h-3 absolute top-28 right-64 flex justify-center items-center bg-sky-100 dark:bg-blue-900 rounded-full"></div>
          <div id="circle-6" className="w-3 h-3 absolute bottom-24 right-96 flex justify-center items-center bg-sky-100 dark:bg-blue-900 rounded-full"></div>
          
          <Link
            className="font-bold text-white dark:text-[#0F1A3E] bg-blue-700 lg:hover:bg-blue-800 dark:bg-sky-400 lg:dark:hover:bg-sky-500 border border-2 border-blue-700 lg:hover:border-blue-800 dark:border-sky-400 lg:dark:hover:border-sky-500 rounded-full mt-12 px-4 py-2"
            type="button" 
            tabIndex={0} 
            role="button" 
            aria-label="button-show-modal"
            href="/"
            replace
          >
            {t('button_back_home')}
          </Link>
        </div>
    )
}
